import {Base} from './base.entity';
import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Exclude, Expose, plainToClass} from 'class-transformer';
import {ClientUser} from './client-user.entity';
import {TopicTag} from './topic-tag.entity';
import {Language} from './language.entity';
import {PublicConversationMessage} from './public-conversation-message.entity';
import {User} from './user.entity';

@Exclude()
@Entity()
export class PublicConversation extends Base
{
    @Expose()
    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'bool', default: false})
    isArchived: boolean;

    @ManyToOne(type => ClientUser, { eager: true, nullable: false })
    owner: ClientUser;

    @ManyToMany(type => ClientUser, { lazy: true })
    @JoinTable()
    bannedUsers: ClientUser[];

    @Expose()
    @ManyToMany(type => TopicTag, { eager: true })
    @JoinTable()
    tags: TopicTag[];

    @Expose()
    @ManyToOne(type => Language, { eager: true, nullable: false })
    language: Language;

    @OneToMany(type => PublicConversationMessage, message => message.conversation)
    messages: PublicConversationMessage[];

    public serialize(groups: Array<string> = []): Object {
        return {
            ...super.serialize(groups),
            ...plainToClass(PublicConversation, this, { groups }),
            owner: this.owner.serialize(groups)
        }
    }
}