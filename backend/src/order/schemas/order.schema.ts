import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class Ticket {
  @Prop({ required: true, type: String })
  id: string;

  @Prop({ required: true, type: String })
  film: string;

  @Prop({ required: true, type: String })
  session: string;

  @Prop({ required: true, type: String })
  daytime: string;

  @Prop({ required: true, type: Number })
  row: number;

  @Prop({ required: true, type: Number })
  seat: number;

  @Prop({ required: true, type: Number })
  price: number;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);

@Schema({ collection: 'orders' })
export class Order {
  @Prop({ type: [TicketSchema], required: true })
  tickets: Ticket[];

  @Prop({ required: true, type: Number })
  total: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

export type OrderDocument = Order & Document;