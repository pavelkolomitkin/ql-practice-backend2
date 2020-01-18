import {AdminUser} from './admin-user.entity';
import {ClientUser} from './client-user.entity';
import {ConfirmationKey} from './confirmation-key.entity';
import {Language} from './language.entity';
import {LanguageLevel} from './language-level.entity';
import {LanguageSkill} from './language-skill.entity';
import {TopicTag} from './topic-tag.entity';
import {User} from './user.entity';

export type Entity = AdminUser
    | ClientUser
    | ConfirmationKey
    | Language
    | LanguageLevel
    | LanguageSkill
    | TopicTag
    | User
    ;