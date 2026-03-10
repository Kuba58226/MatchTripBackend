import { Club } from 'src/club/club.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'schedules' })
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Club, (club) => club.schedules)
  @JoinColumn({ name: 'clubId' })
  homeTeam: Club;

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