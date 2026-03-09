import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TripSearch } from './trip-search.entity';
import { CreateTripSearchDto } from './dto/create-trip-search.dto';
import axios from 'axios';

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

  async create(createTripSearchDto: CreateTripSearchDto): Promise<TripSearch> {
    const { date, returnDate, origin, destination } = createTripSearchDto;

    const url = `https://www.ryanair.com/api/booking/v4/pl-pl/availability?ADT=1&TEEN=0&CHD=0&INF=0&Origin=BER&Destination=MAD&promoCode=&IncludeConnectingFlights=false&DateOut=2026-05-13&DateIn=2026-05-15&FlexDaysBeforeOut=2&FlexDaysOut=2&FlexDaysBeforeIn=2&FlexDaysIn=2&RoundTrip=true&IncludePrimeFares=false&ToUs=AGREED`;

    try {
      const response = await axios.get(url);

      const trip = this.tripSearchRepository.create({
        date: new Date("2026-05-13"),
        flightPrice: 99.99,
        flightPriceCurrency: 'EUR',
      });

      return this.tripSearchRepository.save(trip);

    } catch (error) {
      throw new HttpException('Błąd podczas pobierania danych z Ryanair', HttpStatus.BAD_GATEWAY);
    }
  }
}