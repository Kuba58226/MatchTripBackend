import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'schedules' })
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  homeTeam: string;

  @Column({ type: 'varchar', length: 255 })
  awayTeam: string;

  @Column({ type: 'datetime' })
  date: Date;

  @Column({ type: 'boolean', default: false })
  confirmed: boolean;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}