import {BadRequestException, Injectable} from '@nestjs/common';
import {PublicConversation} from '../../entity/models/public-conversation.entity';
import {User} from '../../entity/models/user.entity';
import {PublicConversationMessage} from '../../entity/models/public-conversation-message.entity';
import {InjectEntityManager} from '@nestjs/typeorm';
import {EntityManager} from 'typeorm';
import {PublicConversationService} from './public-conversation.service';
import {ClientUser} from '../../entity/models/client-user.entity';
import {TextMessage} from '../../entity/models/message/text-message.entity';
import {Photo} from '../../entity/models/photo.entity';
import {PictureMessage} from '../../entity/models/message/picture-message.entity';

@Injectable()
export class PublicConversationMessageService
{
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,

        private readonly publicConversationService: PublicConversationService
    ) {
    }

    public async createTextMessage(conversation: PublicConversation, author: ClientUser, text: string): Promise<PublicConversationMessage>
    {
        let result: PublicConversationMessage = null;

        await this.entityManager.transaction(async ( manager ) => {

            // check if the user is banned in the conversation
            const isBanned: boolean = await this.publicConversationService.isUserBanned(conversation, author, manager);
            if (isBanned)
            {
                throw new BadRequestException('You have been banned in this conversation!');
            }

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

    public async createPictureMessage(conversation: PublicConversation, author: ClientUser, picture: Photo): Promise<PublicConversationMessage>
    {
        let result: PublicConversationMessage = null;

        await this.entityManager.transaction(async ( manager ) => {

            const isBanned: boolean = await this.publicConversationService.isUserBanned(conversation, author, manager);
            if (isBanned)
            {
                throw new BadRequestException('You have been banned in this conversation!');
            }


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