import {Body, Controller, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {User as CurrentUser} from '../../../core/decorators/user.decorator';
import {AuthGuard} from '@nestjs/passport';
import {ClientUser} from '../../../entity/models/client-user.entity';
import {PublicConversationDto} from '../../dto/public-conversation/public-conversation.dto';
import {ParameterConverterPipe} from '../../../core/pipes/parameter-converter.pipe';
import {Language} from '../../../entity/models/language.entity';
import {PublicConversationService} from '../../services/public-conversation.service';
import {PublicConversation} from '../../../entity/models/public-conversation.entity';
import {PublicConversationTopicsDto} from '../../dto/public-conversation/public-conversation-topics.dto';
import {DateTimePipe} from '../../../core/pipes/date-time.pipe';

@UseGuards(AuthGuard())
@Controller('client/public-conversation')
export class PublicConversationController {

    constructor(
        private readonly service: PublicConversationService
    ) {
    }

    @Get('/list')
    public async getMyList(
        @Query('lastCreatedAt', DateTimePipe) lastCreatedAt: Date,
        @CurrentUser() user: ClientUser
    )
    {
        const list: PublicConversation[] = await this.service.getList(user, lastCreatedAt);

        return {
            list: list.map(item => item.serialize(['mine']))
        };
    }

    @Post()
    public async create(
        @Body() data: PublicConversationDto,
        @Body('title') title: string,
        @Body('language', ParameterConverterPipe) language: Language,
        @CurrentUser() user: ClientUser
    )
    {
        const conversation: PublicConversation = await this.service.create(title, language, user);

        return {
            conversation: conversation.serialize(['mine'])
        };
    }

    @Put(':id')
    public async update(
        @Param('id', ParameterConverterPipe) conversation: PublicConversation,
        @Body() data: PublicConversationDto,
        @Body('title') title: string,
        @Body('language', ParameterConverterPipe) language: Language,
        @CurrentUser() user: ClientUser
    )
    {
        await this.service.update(conversation, user, title, language);

        return {
            conversation: conversation.serialize(['mine'])
        };
    }

    @Put(':id')
    public async archive(
        @Query('archived') isArchived: string,
        @Param('id', ParameterConverterPipe) conversation: PublicConversation,
        @CurrentUser() user: ClientUser
    )
    {
        await this.service.setArchived(conversation, user, (isArchived === '1'));

        return {
            conversation: conversation.serialize(['mine'])
        };
    }

    @Put(':id/topics')
    public async updateTopics(
        @Param('id', ParameterConverterPipe) conversation: PublicConversation,
        @Body() data: PublicConversationTopicsDto,
        @CurrentUser() user: ClientUser
    )
    {
        await this.service.updateTopics(conversation, user, data.topics);

        return {
            conversation: conversation.serialize(['mine'])
        };
    }

    @Post(':id/user-ban-status/:userId')
    public async setUserBanStatus(
        @Query('ban') ban: string,
        @Param('id', ParameterConverterPipe) conversation: PublicConversation,
        @Param('userId', ParameterConverterPipe) targetUser: ClientUser,
        @CurrentUser() user: ClientUser
    )
    {
        if (ban === '1')
        {
            await this.service.banUser(conversation, user, targetUser);
        }
        else
        {
            await this.service.unBanUser(conversation, user, targetUser);
        }

        return {
            conversation: conversation.serialize(['mine'])
        };
    }
}
