import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common';
import {useContainer} from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const validationPipe = app
      .select(AppModule)
      .get(ValidationPipe);

  useContainer(app.select(AppModule), { fallback: true });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(validationPipe);

  await app.listen(process.env.NODE_PORT || 3000);
}
bootstrap();
