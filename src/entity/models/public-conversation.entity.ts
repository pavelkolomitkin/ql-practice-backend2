import {Base} from './base.entity';
import {Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
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

    @Expose()
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

    @Expose()
    @CreateDateColumn({ type: 'timestamp without time zone' })
    createdAt: Date;

    @Expose()
    @UpdateDateColumn({ type: 'timestamp without time zone' })
    updatedAt: Date;

    public serialize(groups: Array<string> = []): Object {

        const result: any = {
            ...super.serialize(groups),
            ...plainToClass(PublicConversation, this, { groups }),
        };

        if (this.owner)
        {
            result.owner = this.owner.serialize(groups);
        }

        return result;
    }
}