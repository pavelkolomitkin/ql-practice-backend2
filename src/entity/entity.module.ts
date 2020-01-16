import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './models/user.entity';
import {AdminUser} from './models/admin-user.entity';
import {ClientUser} from './models/client-user.entity';
import {Language} from './models/language.entity';
import {LanguageLevel} from './models/language-level.entity';
import {LanguageSkill} from './models/language-skill.entity';
import {ConfirmationKey} from './models/confirmation-key.entity';
import {TopicTag} from './models/topic-tag.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([
            User,
            AdminUser,
            ClientUser,
            Language,
            LanguageLevel,
            LanguageSkill,
            ConfirmationKey,
            TopicTag,
        ])
    ],
    exports: [
        TypeOrmModule
    ]
})
export class EntityModule {}
