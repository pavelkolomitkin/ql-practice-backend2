import {EntityExistsValidator} from '../../../core/validators/entity-exists.validator';
import {MaxLength, Validate} from 'class-validator';

export class PublicConversationDto
{
    @MaxLength(255, { message: '255 symbols maximum' })
    title: string;

    @Validate(EntityExistsValidator, ['Language', 'id'], { message: 'The language does not exist!' })
    language: number;
}