import {Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {ClientUser} from './client-user.entity';
import {Language} from './language.entity';
import {LanguageLevel} from './language-level.entity';
import {TopicTag} from './topic-tag.entity';
import {Exclude, Expose, plainToClass} from 'class-transformer';
import {Base} from './base.entity';

@Exclude()
@Entity()
export class LanguageSkill extends Base
{
    @Expose()
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => ClientUser, user => user.skills)
    user: ClientUser;

    @Expose()
    @ManyToOne(type => Language, { eager: true })
    language: Language;

    @Expose()
    @ManyToOne(type => LanguageLevel, { eager: true })
    level: LanguageLevel;

    @Expose()
    @ManyToMany(type => TopicTag, { eager: true })
    @JoinTable()
    tags: TopicTag[];


    serialize(groups: Array<string> = []): Object {
        return {
            ...super.serialize(groups),
            ...plainToClass(LanguageSkill, this, { groups })
        };
    }
}
