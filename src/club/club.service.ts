import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Club } from './club.entity';
import { Route } from 'src/route/route.entity';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(Club)
    private readonly clubRepository: Repository<Club>,
    @InjectRepository(Route)
    private readonly routeRepository: Repository<Route>,
  ) {}

  findAll(): Promise<Club[]> {
    return this.clubRepository.find();
  }

  async getCityAirportsAndIncomingRoutes(clubId: string) {
    const club = await this.clubRepository.findOne({
      where: { id: clubId },
      relations: ['city', 'city.airports'],
    });
    if (!club) return null;

    const cityAirportIds = club.city.airports.map(a => a.id);

    const incomingRoutes = await this.routeRepository.find({
      where: { destination: In(cityAirportIds) },
      relations: ['origin', 'destination'],
    });

    return {
      club: club.name,
      city: club.city.name,
      airports: club.city.airports,
      incomingRoutes,
    };
  }
}