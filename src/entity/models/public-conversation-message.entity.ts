import {Base} from './base.entity';
import {Exclude, Expose} from 'class-transformer';
import {Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique} from 'typeorm';
import {PublicConversation} from './public-conversation.entity';
import {Message} from './message/message.entity';

@Exclude()
@Unique(['message'])
@Entity()
export class PublicConversationMessage extends Base
{
    @Expose()
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => PublicConversation)
    conversation: PublicConversation;

    @Expose()
    @ManyToOne (type => Message, { eager: true })
    message: Message;
}
