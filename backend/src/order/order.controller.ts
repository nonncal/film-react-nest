import { Controller, Post, Body, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto, OrderRequestDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async addOrder(@Body() order: OrderRequestDto): Promise<OrderDto> {
    return this.orderService.create(order.tickets);
  }
}