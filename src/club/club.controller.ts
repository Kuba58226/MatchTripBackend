import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { ClubService } from './club.service';
import { Club } from './club.entity';

@Controller('club')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Get()
  getAll(): Promise<Club[]> {
    return this.clubService.findAll();
  }
}