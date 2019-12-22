import {Global, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {RedisModule} from 'nestjs-redis';
import {ConfigModule} from '../config/config.module';
import { providers } from './providers/services.provider';
import {EntityExistsValidator} from './validators/entity-exists.validator';

@Global()
@Module({
    providers: [
        ...providers,
        EntityExistsValidator
    ],

    imports: [
        ConfigModule,
        TypeOrmModule.forRoot(),
        RedisModule.register([
            {
                name: process.env.REDIS_CONNECTION_NAME,
                url: process.env.REDIS_CONNECTION
            }
        ]),
    ],
    exports: [
        ConfigModule,
        TypeOrmModule,
        RedisModule
    ]
})
export class CoreModule {}
