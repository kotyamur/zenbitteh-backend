import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Deal {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column()
  cost: number;

  @Column()
  ticketprice: number;

  @Column()
  outcome: number;

  @Column()
  daysnumber: number;

  @Column()
  sold: number;
}
