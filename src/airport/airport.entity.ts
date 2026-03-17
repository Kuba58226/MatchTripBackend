import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { City } from '../city/city.entity';

@Entity({ name: 'airports' })
export class Airport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 3, unique: true })
  iataCode: string;

  @ManyToOne(() => City, (city) => city.airports, { nullable: false })
  @JoinColumn({ name: 'city_id' })
  city: City;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}