import {Message} from './message.entity';
import {Exclude} from 'class-transformer';
import {ChildEntity} from 'typeorm';


@Exclude()
@ChildEntity()
export class VoiceMessage extends Message
{

}