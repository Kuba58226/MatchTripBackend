import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Airport } from './airport.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Airport])],
  controllers: [],
  providers: [],
})
export class AirportModule {}