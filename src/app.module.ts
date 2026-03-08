import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Schedule } from "./schedule/schedule.entity";
import { ScheduleModule } from "./schedule/schedule.module";
import { TripSearch } from './trip-search/trip-search.entity';
import { TripSearchModule } from './trip-search/trip-search.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<'mysql' | 'mariadb'>('DATABASE_DIALECT'),
        host: configService.get<string>('DATABASE_HOST'),
        port: parseInt(configService.get<string>('DATABASE_URL_PORT') || '3306'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [
          Schedule,
          TripSearch,
        ],
        synchronize: configService.get<string>('NODE_ENV') === 'DEV',
      }),
    }),
    ScheduleModule,
    TripSearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
