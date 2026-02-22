import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'json' })
  tickets: Array<{
    id: string;
    film: string;
    session: string;
    daytime: string;
    row: number;
    seat: number;
    price: number;
  }>;
  @Column()
  total: number;
  @CreateDateColumn()
  createdAt: Date;
}
