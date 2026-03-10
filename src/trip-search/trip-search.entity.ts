import { Index, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'trip_searches' })
@Index(['date', 'origin', 'destination'], { unique: true })
export class TripSearch {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'datetime' })
  date: Date;

  @Column({ type: 'varchar', length: 10 })
  origin: string;

  @Column({ type: 'varchar', length: 10 })
  destination: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  outboundFlightPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  returnFlightPrice: number;

  @Column({ type: 'varchar', length: 10 })
  flightPriceCurrency: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}