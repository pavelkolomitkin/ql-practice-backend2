import { Module } from '@nestjs/common';
import { ProfileController } from './controllers/profile.controller';
import {EntityModule} from '../entity/entity.module';
import {AvatarController} from './controllers/avatar.controller';
import { AvatarService } from './services/avatar.service';

@Module({
  imports: [
      EntityModule
  ],
  controllers: [ProfileController, AvatarController],
  exports: [
      EntityModule
  ],
  providers: [AvatarService]
})
export class ClientModule {}
