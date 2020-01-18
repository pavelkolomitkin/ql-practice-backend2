import {Global, HttpModule, Module, ValidationPipe} from '@nestjs/common';
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
import {ClientModule} from '../client/client.module';
import {MulterModule} from '@nestjs/platform-express';
import {ImageThumbService} from './services/image-thumb.service';
import {UploadManagerService} from './services/upload-manager.service';
import {UserPhotoController} from './controllers/user-photo.controller';

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
        EntityExistsValidator,
        ImageThumbService,
        UploadManagerService,
    ],
    imports: [
        HttpModule,
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
        ClientModule
    ],
    exports: [
        ...providers,
        HttpModule,
        Validator,
        ValidationPipe,
        ConfigModule,
        RedisModule,
        EntityModule,
        SecurityModule,
        ClientModule,
        ImageThumbService,
        UploadManagerService,
    ],
    controllers: [LanguageController, LanguageLevelController, UserPhotoController]
})
export class CoreModule {}
