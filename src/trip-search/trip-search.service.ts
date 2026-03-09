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
    const { date, origin, destination } = createTripSearchDto;

    const matchDate = new Date(date);

    const dateOut = new Date(matchDate);
    dateOut.setDate(matchDate.getDate() - 2);

    const dateIn = new Date(matchDate);
    dateIn.setDate(matchDate.getDate() + 2);

    const flexBeforeOut = 2;
    const flexAfterOut = 1;
    const flexBeforeIn = 1;
    const flexAfterIn = 2;

    const params = new URLSearchParams({
      ADT: '1',
      TEEN: '0',
      CHD: '0',
      INF: '0',
      Origin: origin,
      Destination: destination,
      promoCode: '',
      IncludeConnectingFlights: 'false',
      DateOut: dateOut.toISOString().split('T')[0],
      DateIn: dateIn.toISOString().split('T')[0],
      FlexDaysBeforeOut: flexBeforeOut.toString(),
      FlexDaysOut: flexAfterOut.toString(),
      FlexDaysBeforeIn: flexBeforeIn.toString(),
      FlexDaysIn: flexAfterIn.toString(),
      RoundTrip: 'true',
      IncludePrimeFares: 'false',
      ToUs: 'AGREED',
    });

    const url = `https://www.ryanair.com/api/booking/v4/pl-pl/availability?${params}`;

    try {
      const response = await axios.get(url);

      console.log(response.data.trips[0].dates[1].flights[0].regularFare.fares[0].amount);

      const existingTrip = await this.tripSearchRepository.findOne({
        where: { date: matchDate, origin, destination },
      });

      if (existingTrip) {
        existingTrip.flightPrice = 90.00;
        existingTrip.flightPriceCurrency = 'EUR';
        return await this.tripSearchRepository.save(existingTrip);
      } else {
      const newTrip = this.tripSearchRepository.create({
        date,
        origin,
        destination,
        flightPrice: 99.99,
        flightPriceCurrency: 'EUR',
      });
      return await this.tripSearchRepository.save(newTrip);
    }

    } catch (error) {
      throw new HttpException('Błąd podczas pobierania danych z Ryanair', HttpStatus.BAD_GATEWAY);
    }
  }
}