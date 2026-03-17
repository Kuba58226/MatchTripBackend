import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { ScheduleService } from './schedule.service';

@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  async getByClubAndMonth(
    @Query('clubId') clubId: string,
  ) {
    return this.scheduleService.getByClubAndMonth(clubId);
  }
}