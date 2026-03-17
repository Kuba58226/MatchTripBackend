import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './schedule.entity';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { Club } from 'src/club/club.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, Club])],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}