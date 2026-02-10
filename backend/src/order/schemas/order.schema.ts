import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema({collection: 'orders'})
export class Order extends Document {
  @Prop({required: true})
  film: string;
  @Prop({required: true})
  scheduleId: string;
  @Prop({required: true})
  daytime: string;
  @Prop({required: true})
}