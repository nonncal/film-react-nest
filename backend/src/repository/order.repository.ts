import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { Model } from 'mongoose';
import { TicketDto } from 'src/order/dto/order.dto';
import { Order, OrderDocument } from 'src/order/schemas/order.schema';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
  ) {}

  async create(tickets: TicketDto[], total: number): Promise<OrderDocument> {
    const ticketsWithId = tickets.map((ticket) => ({
      ...ticket,
      id: randomUUID(),
    }));

    const order = new this.orderModel({
      tickets: ticketsWithId,
      total,
    });

    return order.save();
  }

  async findAll(): Promise<OrderDocument[]> {
    return this.orderModel.find().exec();
  }

  async findById(id: string): Promise<OrderDocument | null> {
    return this.orderModel.findById(id).exec();
  }
}
