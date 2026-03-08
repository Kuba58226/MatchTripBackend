import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripSearch } from './trip-search.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TripSearch])],
  controllers: [],
  providers: [],
})
export class TripSearchModule {}