import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, Between } from 'typeorm';
import { Schedule } from './schedule.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async getByClubAndMonth(
    clubId: string
  ): Promise<Schedule[]> {
    const now = new Date();

    return this.scheduleRepository.find({
      where: {
        homeTeam: { id: clubId },
        date: MoreThan(now),
    },
      relations: ['homeTeam'],
      order: { date: 'ASC' },
    });
  }
}