import { Schedule } from 'src/schedule/schedule.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { City } from '../city/city.entity';

@Entity({ name: 'clubs' })
export class Club {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 500 })
  logoUrl: string;

  @OneToMany(() => Schedule, (schedule) => schedule.homeTeam)
  schedules: Schedule[];

  @ManyToOne(() => City, (city) => city.clubs, { nullable: false })
  @JoinColumn({ name: 'city_id' })
  city: City;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}