import {BadRequestException, Injectable} from '@nestjs/common';
import {PublicConversationMessageService} from './public-conversation-message.service';
import {PublicConversation} from '../../entity/models/public-conversation.entity';
import {ClientUser} from '../../entity/models/client-user.entity';
import {PublicConversationMessage} from '../../entity/models/public-conversation-message.entity';
import {TextMessage} from '../../entity/models/message/text-message.entity';

@Injectable()
export class PublicConversationTextMessageService extends PublicConversationMessageService
{
    public async create(conversation: PublicConversation, author: ClientUser, text: string): Promise<PublicConversationMessage>
    {
        let result: PublicConversationMessage = null;

        await this.entityManager.transaction(async ( manager ) => {

            // check if the user is banned in the conversation
            await this.validateBanned(conversation, author, manager);

            const message: TextMessage = new TextMessage();
            message.text = text.trim();
            message.user = author;
            await manager.save(message);

            result = new PublicConversationMessage();
            result.conversation = conversation;
            result.message = message;

            await manager.save(result);
        });

        return result;
    }

    public async update(message: PublicConversationMessage, editor: ClientUser, text: string): Promise<PublicConversationMessage>
    {
        this.validateOwner(message, editor);

        if (!(message.message instanceof TextMessage))
        {
            throw new BadRequestException('Only text messages can be edited!');
        }

        await this.entityManager.transaction( async (manager) => {

            // check if the user is banned in the conversation
            await this.validateBanned(message.conversation, editor, manager);

            (message.message as TextMessage).text = text;

            await manager.save(message.message);
        });

        return message;
    }
}