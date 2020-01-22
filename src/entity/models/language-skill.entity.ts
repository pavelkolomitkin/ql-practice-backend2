import {CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn} from 'typeorm';
import {ClientUser} from './client-user.entity';
import {Language} from './language.entity';
import {LanguageLevel} from './language-level.entity';
import {TopicTag} from './topic-tag.entity';
import {Exclude, Expose, plainToClass} from 'class-transformer';
import {Base} from './base.entity';

@Exclude()
@Unique(['user', 'language'])
@Entity()
export class LanguageSkill extends Base
{
    @Expose()
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => ClientUser, user => user.skills, { lazy: true, nullable: false })
    user: ClientUser;

    @Expose()
    @ManyToOne(type => Language, { eager: true, nullable: false })
    language: Language;

    @Expose()
    @ManyToOne(type => LanguageLevel, { eager: true, nullable: false })
    level: LanguageLevel;

    @Expose()
    @ManyToMany(type => TopicTag, { eager: true })
    @JoinTable()
    tags: TopicTag[];

    @Expose({ groups: ['admin'] })
    @CreateDateColumn({ type: 'timestamp without time zone' })
    createdAt: Date;

    @Expose({ groups: ['admin'] })
    @UpdateDateColumn({ type: 'timestamp without time zone' })
    updatedAt: Date;

    serialize(groups: Array<string> = []): Object {
        return {
            ...super.serialize(groups),
            ...plainToClass(LanguageSkill, this, { groups })
        };
    }
}
