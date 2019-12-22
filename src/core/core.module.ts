import {Global, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {RedisModule} from 'nestjs-redis';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRoot(),
        RedisModule.register([
            {
                name: process.env.REDIS_CONNECTION_NAME,
                url: process.env.REDIS_CONNECTION
            }
        ]),
    ],
    exports: [
        TypeOrmModule,
        RedisModule
    ]
})
export class CoreModule {}
