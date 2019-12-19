import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {RedisModule} from 'nestjs-redis';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    RedisModule.register([
        {
          name: process.env.REDIS_CONNECTION_NAME,
          url: process.env.REDIS_CONNECTION
        }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
