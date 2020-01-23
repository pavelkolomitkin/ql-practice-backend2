import {PublicConversationMessageService} from './public-conversation-message.service';
import {Injectable} from '@nestjs/common';
import {PublicConversation} from '../../entity/models/public-conversation.entity';
import {ClientUser} from '../../entity/models/client-user.entity';
import {Photo} from '../../entity/models/photo.entity';
import {PublicConversationMessage} from '../../entity/models/public-conversation-message.entity';
import {PictureMessage} from '../../entity/models/message/picture-message.entity';

@Injectable()
export class PublicConversationPictureMessageService extends PublicConversationMessageService
{
    public async create(conversation: PublicConversation, author: ClientUser, picture: Photo): Promise<PublicConversationMessage>
    {
        let result: PublicConversationMessage = null;

        await this.entityManager.transaction(async ( manager ) => {

            await this.validateBanned(conversation, author, manager);

            const message: PictureMessage = new PictureMessage();
            message.picture = picture;
            message.user = author;
            await manager.save(message);

            result = new PublicConversationMessage();
            result.message = message;
            result.conversation = conversation;
            await manager.save(result);

        });

        return result;
    }
}