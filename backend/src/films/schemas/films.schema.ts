import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class Schedule {
  @Prop({ type: String })
  id: string;

  @Prop({ required: true, type: String })
  daytime: string;

  @Prop({ required: true, type: Number })
  hall: number;

  @Prop({ required: true, type: Number })
  rows: number;

  @Prop({ required: true, type: Number })
  seats: number;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ type: [String], default: [] })
  taken: string[];
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);

@Schema({ collection: 'films' })
export class Film {
  _id: any;

  @Prop({ type: String, required: true })
  id: string;

  @Prop({ required: true, type: Number })
  rating: number;

  @Prop({ required: true, type: String })
  director: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ required: true, type: String })
  image: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  about: string;

  @Prop({ required: true, type: String })
  cover: string;

  @Prop({ type: [ScheduleSchema], default: [] })
  schedule: Schedule[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);

export type FilmDocument = Film & Document;