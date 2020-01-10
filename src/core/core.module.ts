import {Global, Module, ValidationPipe} from '@nestjs/common';
import {RedisModule} from 'nestjs-redis';
import {ConfigModule} from '../config/config.module';
import { providers } from './providers/services.provider';
import {EntityExistsValidator} from './validators/entity-exists.validator';
import { LanguageController } from './controllers/language.controller';
import {SecurityModule} from '../security/security.module';
import {EntityModule} from '../entity/entity.module';
import { LanguageLevelController } from './controllers/language-level.controller';
import {APP_PIPE} from '@nestjs/core';

@Global()
@Module({
    providers: [
        ...providers,
        {
            provide: APP_PIPE,
            useClass: ValidationPipe
        },
        EntityExistsValidator
    ],
    imports: [
        ValidationPipe,
        ConfigModule,
        EntityModule,
        RedisModule.register([
            {
                name: process.env.REDIS_CONNECTION_NAME,
                url: process.env.REDIS_CONNECTION
            }
        ]),
        SecurityModule,
    ],
    exports: [
        ...providers,
        ValidationPipe,
        ConfigModule,
        RedisModule,
        EntityModule,
        SecurityModule,
    ],
    controllers: [LanguageController, LanguageLevelController]
})
export class CoreModule {}
