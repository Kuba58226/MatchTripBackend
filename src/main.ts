import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: false,
    transform: true,
  }));

  const corsOrigins = configService
      .get<string>('CORS_ORIGINS')
      ?.split(',')
      .map(origin => origin.trim());

  app.enableCors({
    origin: corsOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    exposedHeaders: ['Content-Range'],
  });

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
  prefix: '/uploads/',
});

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
