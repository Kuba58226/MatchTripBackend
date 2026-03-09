import { IsString, IsDateString } from 'class-validator';

export class CreateTripSearchDto {
  @IsDateString()
  date: string;

  @IsString()
  origin: string;

  @IsString()
  destination: string;
}