import {Message} from './message.entity';
import {Exclude, Expose} from 'class-transformer';
import {ChildEntity, Column} from 'typeorm';

@Exclude()
@ChildEntity()
export class TextMessage extends Message
{
    @Expose()
    @Column({ type: 'text', nullable: true})
    text: string;
}