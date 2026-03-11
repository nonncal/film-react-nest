import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { TicketDto } from 'src/order/dto/order.dto';
import { Order } from '../order/entities/order.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(tickets: TicketDto[], total: number): Promise<Order> {
    const ticketsWithId = tickets.map((ticket) => ({
      ...ticket,
      id: randomUUID(),
    }));

    const order = this.orderRepository.create({
      tickets: ticketsWithId,
      total,
    });

    return this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async findById(id: string): Promise<Order | null> {
    return this.orderRepository.findOne({ where: { id } });
  }
}
