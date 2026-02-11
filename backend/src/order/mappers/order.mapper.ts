import { OrderDocument, Ticket } from '../schemas/order.schema';
import { OrderDto, TicketResponseDto } from '../dto/order.dto';

export class OrderMapper {
  static ticketToDto(ticket: Ticket): TicketResponseDto {
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

  static toDto(order: OrderDocument): OrderDto {
    return {
      total: order.tickets.length,
      items: order.tickets.map(ticket => this.ticketToDto(ticket)),
    };
  }
}