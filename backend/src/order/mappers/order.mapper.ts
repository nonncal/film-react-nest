import { Order } from '../entities/order.entity';
import { OrderDto, TicketResponseDto } from '../dto/order.dto';

export class OrderMapper {
  static ticketToDto(
    ticket: Order['tickets'][number]
  ): TicketResponseDto {
    return {
      id: ticket.id,
      film: ticket.film,
      session: ticket.session,
      daytime: ticket.daytime,
      row: ticket.row,
      seat: ticket.seat,
      price: ticket.price,
    };
  }

  static toDto(order: Order): OrderDto {
    return {
      total: order.total, // 🔥 лучше использовать поле из БД
      items: order.tickets.map((ticket) =>
        this.ticketToDto(ticket),
      ),
    };
  }
}