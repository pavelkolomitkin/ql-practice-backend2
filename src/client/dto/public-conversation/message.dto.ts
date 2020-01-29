import {Validate} from 'class-validator';
import {EntityExistsValidator} from '../../../core/validators/entity-exists.validator';
import {ArchivedPublicConversation} from '../../validators/archived-public-conversation.validator';

export class MessageDto
{
    @Validate(EntityExistsValidator, ['PublicConversation', 'id'], { message: 'The conversation does not exist!' })
    @Validate(ArchivedPublicConversation)
    conversation: number;
}