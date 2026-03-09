import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripSearch } from './trip-search.entity';
import { TripSearchService } from './trip-search.service';
import { TripSearchController } from './trip-search.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TripSearch])],
  controllers: [TripSearchController],
  providers: [TripSearchService],
})
export class TripSearchModule {}