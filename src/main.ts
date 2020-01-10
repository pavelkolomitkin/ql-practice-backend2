import {APP_PIPE, NestFactory} from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common';
import {useContainer} from 'class-validator';
import {CoreModule} from './core/core.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const validationPipe = app
      .select(AppModule)
      .select(CoreModule)
      .get(ValidationPipe);

  useContainer(app.select(AppModule), { fallback: true });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(validationPipe);

  await app.listen(process.env.NODE_PORT || 3000);
}
bootstrap();
