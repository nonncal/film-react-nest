import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { TicketDto, OrderDto } from './dto/order.dto';
import { OrderMapper } from './mappers/order.mapper';
import { OrderRepository } from '../repository/order.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly filmsRepository: FilmsRepository,
  ) {}

  async create(tickets: TicketDto[]): Promise<OrderDto> {
    if (!tickets || tickets.length === 0) {
      throw new BadRequestException('Tickets array is empty');
    }

    this.checkDuplicatesaAndSeats(tickets);

    await this.validateFilmsAndSessions(tickets);

    const bookedSeats: Array<{
      filmId: string;
      sessionId: string;
      row: number;
      seat: number;
    }> = [];

    try {
      for (const ticket of tickets) {
        const success = await this.filmsRepository.takeSeat(
          ticket.film,
          ticket.session,
          ticket.row,
          ticket.seat,
        );

        if (!success) {
          throw new BadRequestException(
            `Seat ${ticket.row}:${ticket.seat} is already taken`,
          );
        }

        bookedSeats.push({
          filmId: ticket.film,
          sessionId: ticket.session,
          row: ticket.row,
          seat: ticket.seat,
        });
      }

      const total = tickets.reduce((acc, ticket) => acc + ticket.price, 0);
      const order = await this.orderRepository.create(tickets, total);

      return OrderMapper.toDto(order);
    } catch (error) {
      for (const seat of bookedSeats) {
        await this.filmsRepository.releaseSeat(
          seat.filmId,
          seat.sessionId,
          seat.row,
          seat.seat,
        );
      }

      throw error;
    }
  }

  private async validateFilmsAndSessions(tickets: TicketDto[]): Promise<void> {
    for (const ticket of tickets) {
      const film = await this.filmsRepository.findById(ticket.film);

      if (!film) {
        throw new NotFoundException(`Film ${ticket.film} not found`);
      }

      const schedule = film.schedules.find((s) => s.id === ticket.session);

      if (!schedule) {
        throw new NotFoundException(`Session ${ticket.session} not found`);
      }

      this.validateSeatPosition(ticket.row, ticket.seat, schedule);
    }
  }

  private validateSeatPosition(row: number, seat: number, schedule: any): void {
    if (row < 1 || seat < 1) {
      throw new BadRequestException('Row and seat must be >= 1');
    }

    if (row > schedule.rows) {
      throw new BadRequestException(
        `Row ${row} exceeds max rows (${schedule.rows})`,
      );
    }

    if (seat > schedule.seats) {
      throw new BadRequestException(
        `Seat ${seat} exceeds max seats (${schedule.seats})`,
      );
    }
  }
  private checkDuplicatesaAndSeats(tickets: TicketDto[]): void {
    const seatKeys = tickets.map(
      (t) => `${t.film}:${t.session}:${t.row}:${t.seat}`,
    );
    const uniqKeys = new Set(seatKeys);

    if (seatKeys.length !== uniqKeys.size) {
      throw new BadRequestException('Duplicate tickets in request');
    }
  }
}
