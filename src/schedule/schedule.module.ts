import { Module } from '@nestjs/common';  // <-- bardzo ważne!
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule])],
  controllers: [],
  providers: [],
})
export class ScheduleModule {}