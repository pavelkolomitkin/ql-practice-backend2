import {Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {ClientUser} from './client-user.entity';
import {Language} from './language.entity';
import {LanguageLevel} from './language-level.entity';
import {TopicTag} from './topic-tag.entity';

@Entity()
export class LanguageSkill
{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => ClientUser, user => user.skills)
    user: ClientUser;

    @ManyToOne(type => Language)
    language: Language;

    @ManyToOne(type => LanguageLevel)
    level: LanguageLevel;

    @ManyToMany(type => TopicTag)
    @JoinTable()
    tags: TopicTag[];
}
