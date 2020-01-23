import {IsNotEmpty, MaxLength} from 'class-validator';
import {MessageDto} from './message.dto';

export class TextMessageDto extends MessageDto
{
    @IsNotEmpty({ message: 'Enter the message' })
    @MaxLength(1000, { message: '1000 symbols maximum' })
    text: string;
}