import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, } from 'typeorm';
import { Film } from './film.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  filmId: string;
  @Column()
  daytime: string;
  @Column()
  hall: number;
  @Column()
  rows: number;
  @Column()
  seats: number;
  @Column()
  price: number;
  @Column()
  taken: string;
  @ManyToOne(() => Film, (film) => film.schedule)
  film: Film;

  getTakenArray() :string[] {
    return this.taken ? this.taken.split(',').filter(Boolean) : [];
  }

  setTakenArray(taken: string[]): void {
    this.taken = taken.join(',');
  }

  addSeat(row: number, seat: number): void {
    const seatKey = `${row}:${seat}`;
    const takenArray = this.getTakenArray();
    if(!takenArray.includes(seatKey)) {
      takenArray.push(seatKey);
      this.setTakenArray(takenArray);
    }
  }

  removeSeat(row: number, seat: number): void {
    const seatKey = `${row}:${seat}`;
    const takenArray = this.getTakenArray().filter(s => s!== seatKey);
    this.setTakenArray(takenArray);
  } 

  isSeatTaken(row: number, seat: number): boolean {
    const seatKey = `${row}:${seat}`;
    return this.getTakenArray().includes(seatKey);
  }
}