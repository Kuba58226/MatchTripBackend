import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Airport } from '../airport/airport.entity';

@Entity({ name: 'routes' })
export class Route {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Airport, { nullable: false })
  @JoinColumn({ name: 'origin_id' })
  origin: Airport;

  @ManyToOne(() => Airport, { nullable: false })
  @JoinColumn({ name: 'destination_id' })
  destination: Airport;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}