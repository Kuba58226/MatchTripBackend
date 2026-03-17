import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Club } from './club.entity';
import { ClubController } from './club.controller';
import { ClubService } from './club.service';
import { City } from 'src/city/city.entity';
import { Airport } from 'src/airport/airport.entity';
import { Route } from 'src/route/route.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Club, City, Airport, Route])],
  controllers: [ClubController],
  providers: [ClubService],
})
export class ClubModule {}