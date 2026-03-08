import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TripSearch } from './trip-search.entity';

@Injectable()
export class TripSearchService {
  constructor(
    @InjectRepository(TripSearch)
    private readonly tripSearchRepository: Repository<TripSearch>,
  ) {}

  findAll(): Promise<TripSearch[]> {
    return this.tripSearchRepository.find();
  }

  findOne(id: string): Promise<TripSearch | null> {
    return this.tripSearchRepository.findOneBy({ id });
  }
}