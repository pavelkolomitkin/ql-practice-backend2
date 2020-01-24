import {BadRequestException, Injectable} from '@nestjs/common';
import {PublicConversation} from '../../entity/models/public-conversation.entity';
import {Language} from '../../entity/models/language.entity';
import {ClientUser} from '../../entity/models/client-user.entity';
import {InjectEntityManager, InjectRepository} from '@nestjs/typeorm';
import {EntityManager, Repository} from 'typeorm';
import {LanguageSkill} from '../../entity/models/language-skill.entity';
import {TopicTagService} from './topic-tag.service';

@Injectable()
export class PublicConversationService
{
    static LIST_MAX_ITEM_NUMBER = 10;

    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        private readonly tagService: TopicTagService,

        @InjectRepository(PublicConversation)
        private readonly repository: Repository<PublicConversation>
    ) {
    }

    public async getList(owner: ClientUser, createdAtFrom: Date = null)
    {
       const result = await this
           .entityManager
           .createQueryBuilder(PublicConversation,'conversation')
           .innerJoin('conversation.owner', 'owner')
           .innerJoinAndSelect('conversation.language', 'language')
           .leftJoinAndSelect('conversation.tags', 'tags')
           .where('owner.id = :ownerId', { ownerId: owner.id })
           .orderBy('conversation.createdAt', 'DESC')
           .take(PublicConversationService.LIST_MAX_ITEM_NUMBER);
       if (createdAtFrom)
       {
           result.andWhere('conversation.createdAt < :createdAt', { createdAt: createdAtFrom });
       }

       return result.getMany();
    }

    public async create(title: string, language:Language, user: ClientUser): Promise<PublicConversation>
    {
        let result: PublicConversation = null;

        await this.entityManager.transaction(async (manager) => {
            // check if the user has the appropriate language skill

            const skill: LanguageSkill = await manager.getRepository(LanguageSkill).findOne({
                user,
                language
            });
            // if they don't
            if (!skill)
            {
                // throw BadRequestException('You have not the language skill')
                throw new BadRequestException({
                    language: 'You have not the ' + language.title + ' skill'
                });
            }

            // create the public conversation
            result = new PublicConversation();

            result.title = title;
            result.language = language;
            result.owner = user;

            await manager.save(result);
        });

        return result;
    }

    public async update(conversation: PublicConversation, user: ClientUser, title: string, language: Language): Promise<PublicConversation>
    {
        this.validateOwner(conversation, user);

        await this.entityManager.transaction(async (manager) => {

            // check if the user has the appropriate language skill
            const skill: LanguageSkill = await manager.getRepository(LanguageSkill).findOne({
                user,
                language
            });
            // if they don't
            if (!skill)
            {
                // throw BadRequestException('You have not the language skill')
                throw new BadRequestException({
                    language: 'You have not the ' + language.title + ' skill'
                });
            }

            conversation.title = title;
            conversation.language = language;

            await manager.save(conversation);
        });

        return conversation;
    }

    public async setArchived(conversation: PublicConversation, user: ClientUser, isArchived: boolean): Promise<PublicConversation>
    {
        this.validateOwner(conversation, user);

        await this.entityManager.transaction(async (manager) => {

            conversation.isArchived = isArchived;

            await manager.save(conversation);
        });

        return conversation;
    }

    public async updateTopics(conversation: PublicConversation, user: ClientUser, topics: string[]): Promise<PublicConversation>
    {
        this.validateOwner(conversation, user);

        conversation.tags = await this.tagService.getOrCreateTags(topics);

        await this.entityManager.save(conversation);

        return conversation;
    }

    public async banUser(conversation: PublicConversation, owner: ClientUser, targetUser: ClientUser): Promise<PublicConversation>
    {
        this.validateOwner(conversation, owner);

        await this.entityManager.transaction(async (manager) => {

            const isBanned: Boolean = await this.isUserBanned(conversation, targetUser, manager);
            if (isBanned)
            {
                throw new BadRequestException('The user has been already banned!');
            }

            await manager
                .createQueryBuilder()
                .relation(PublicConversation, 'bannedUsers')
                .of(conversation)
                .add(targetUser)
            ;
        });

        return conversation;
    }

    public async unBanUser(conversation: PublicConversation, owner: ClientUser, targetUser: ClientUser): Promise<PublicConversation>
    {
        this.validateOwner(conversation, owner);

        await this.entityManager.transaction(async (manager) => {

            const isBanned: Boolean = await this.isUserBanned(conversation, targetUser, manager);
            if (!isBanned)
            {
                throw new BadRequestException('The user is not banned!');
            }

            await manager
                .createQueryBuilder()
                .relation(PublicConversation, 'bannedUsers')
                .of(conversation)
                .remove(targetUser)
            ;
        });

        return conversation;
    }

    public async isUserBanned(conversation: PublicConversation, user: ClientUser, manager: EntityManager): Promise<boolean>
    {
        return !!await manager
            .createQueryBuilder(PublicConversation, 'conversation')
            .leftJoin(
                'conversation.bannedUsers',
                'bannedUser',
                'bannedUser.id = :targetUserId',
                {
                    targetUserId: user.id
                })
            .andWhere('conversation.id = :conversationId', { conversationId: conversation.id })
            .getOne();
    }


    private validateOwner(conversation: PublicConversation, user: ClientUser)
    {
        if (conversation.owner.id !== user.id)
        {
            throw new BadRequestException('You can not edit this conversation!');
        }
    }
}