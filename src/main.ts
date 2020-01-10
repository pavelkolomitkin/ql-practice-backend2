import {NestFactory} from '@nestjs/core';
import { AppModule } from './app.module';
import {useContainer} from 'class-validator';
import {CoreModule} from './core/core.module';
import {ValidationPipe} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.setGlobalPrefix('api');

  await app.listen(process.env.NODE_PORT || 3000);
}
bootstrap();
