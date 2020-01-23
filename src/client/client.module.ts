import { Module } from '@nestjs/common';
import { ProfileController } from './controllers/profile.controller';
import {EntityModule} from '../entity/entity.module';
import {AvatarController} from './controllers/avatar.controller';
import { AvatarService } from './services/avatar.service';
import { LanguageSkillController } from './controllers/language-skill.controller';
import { LanguageSkillService } from './services/language-skill.service';
import {TopicTagService} from './services/topic-tag.service';
import { TopicTagController } from './controllers/topic-tag.controller';
import { PublicConversationController } from './controllers/public-conversation/public-conversation.controller';
import { PublicConversationMessageController } from './controllers/public-conversation/public-conversation-message.controller';

@Module({
  imports: [
      EntityModule
  ],
  controllers: [
      ProfileController,
      AvatarController,
      LanguageSkillController,
      TopicTagController,
      PublicConversationController,
      PublicConversationMessageController
  ],
  exports: [
      EntityModule
  ],
  providers: [
      AvatarService,
      LanguageSkillService,
      TopicTagService
  ]
})
export class ClientModule {}
