import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { TripSearchService } from './trip-search.service';
import { TripSearch } from './trip-search.entity';
import { CreateTripSearchDto } from './dto/create-trip-search.dto';

@Controller('trip-search')
export class TripSearchController {
  constructor(private readonly tripSearchService: TripSearchService) {}

  @Get()
  getAll(): Promise<TripSearch[]> {
    return this.tripSearchService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<TripSearch | null> {
    return this.tripSearchService.findOne(id);
  }

  @Post()
  create(@Body() createTripSearchDto: CreateTripSearchDto): Promise<TripSearch> {
    return this.tripSearchService.create(createTripSearchDto);
  }
}