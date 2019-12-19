import {Controller, Get, Query} from '@nestjs/common';
import { AppService } from './app.service';
import {RedisService} from 'nestjs-redis';

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private readonly redisService: RedisService
      ) {}

  @Get('api')
  async getHello(@Query('item') item:string = '1') {

    console.log(item);


    const redisClient = this.redisService.getClient(process.env.REDIS_CONNECTION_NAME);

    await redisClient.rpush('mylist', item);
    const list = await redisClient.lrange('mylist', 0, -1);


    return {
      list
    };
  }
}
