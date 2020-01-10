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
import {Validator} from 'class-validator';
import { filters } from './fiters';

@Global()
@Module({
    providers: [
        ...providers,
        Validator,
        {
            provide: APP_PIPE,
            useClass: ValidationPipe
        },
        ...filters,
        EntityExistsValidator
    ],
    imports: [
        Validator,
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
        Validator,
        ValidationPipe,
        ConfigModule,
        RedisModule,
        EntityModule,
        SecurityModule,
    ],
    controllers: [LanguageController, LanguageLevelController]
})
export class CoreModule {}
