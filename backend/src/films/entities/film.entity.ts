import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import { Schedule } from "./schedule.entity";

@Entity('films')
export class Film {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  rating: number;
  @Column()
  director: string;
  @Column()
  tags: string;
  @Column()
  image: string;
  @Column()
  cover: string;
  @Column()
  title: string;
  @Column()
  about: string;
  @Column()
  description: string;
  @OneToMany(() => Schedule, (schedule) => schedule.film)
  schedule: Schedule[]

  getTagsArray(): string[] {
    return this.tags ? this.tags.split(',').map(tag => tag.trim()) : [];
  }

  setTagsArray(tags: string[]): void {
    this.tags = tags.join(',');
  }
}