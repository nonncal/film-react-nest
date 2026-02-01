import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import exp from 'constants';
import {Document, Types} from 'mongoose';

@Schema({ _id: false })
export class Schedule {
  @Prop()
  id: string;
  @Prop({required: true, type: String})
  daytime: string;
  @Prop({required: true, type: Number})
  hall: number;
  @Prop({required: true, type: Number})
  rows: number;
  @Prop({required: true, type: Number})
  seats: number;
  @Prop({required: true, type: Number})
  price: number;
  @Prop({required: true, type: [String], default: []})
  taken: string[];
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);

@Schema()
export class Film extends Document {
  // @Prop({required: true, type: Types.ObjectId})
  // id: string;
  @Prop({required: true, type: Number})
  rating: number;
  @Prop({required: true, type: String})
  director: string;
  @Prop({required: true, type: [String], default: []})
  tags: string[];
  @Prop({required: true, type: String})
  image: string;
  @Prop({required: true, type: String})
  description: string;
  @Prop({required: true, type: String})
  title: string;
  @Prop({required: true, type: String})
  about: string;
  @Prop({required: true, type: String})
  cover: string;
  @Prop({required: true, type: [ScheduleSchema], default: []})
  schedules: Schedule[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);