import {BadRequestException, Injectable} from '@nestjs/common';
import {PublicConversation} from '../../entity/models/public-conversation.entity';
import {PublicConversationMessage} from '../../entity/models/public-conversation-message.entity';
import {InjectEntityManager} from '@nestjs/typeorm';
import {EntityManager} from 'typeorm';
import {PublicConversationService} from './public-conversation.service';
import {ClientUser} from '../../entity/models/client-user.entity';

@Injectable()
export class PublicConversationMessageService
{
    constructor(
        @InjectEntityManager()
        protected readonly entityManager: EntityManager,

        protected readonly publicConversationService: PublicConversationService
    ) {
    }

    public async getList(conversation: PublicConversation, lastCreatedAt: Date): Promise<Array<PublicConversationMessage>>
    {
        return  this
            .entityManager
            .getRepository(PublicConversationMessage)
            .createQueryBuilder('conversationMessage')
            .innerJoin('conversationMessage.message', 'message')
            .where('message.createdAt <= :lastCreatedAt', {lastCreatedAt})
            .orderBy('message.createdAt', 'DESC')
            .getMany()
        ;
    }


    protected validateOwner(conversationMessage: PublicConversationMessage, user: ClientUser)
    {
        if (conversationMessage.message.user.id !== user.id)
        {
            throw new BadRequestException('You can not edit this message!');
        }
    }

    protected async validateBanned(conversation: PublicConversation, user: ClientUser, manager: EntityManager)
    {
        const isBanned: boolean = await this.publicConversationService.isUserBanned(conversation, user, manager);
        if (isBanned)
        {
            throw new BadRequestException('You have been banned in this conversation!');
        }
    }

    public async remove(message: PublicConversationMessage, user: ClientUser): Promise<void>
    {
        this.validateOwner(message, user);

        await this.entityManager.transaction(async (manager) => {

            await this.validateBanned(message.conversation, user, manager);

            message.message.isRemoved = true;
            await manager.save(message.message);
        });
    }
}