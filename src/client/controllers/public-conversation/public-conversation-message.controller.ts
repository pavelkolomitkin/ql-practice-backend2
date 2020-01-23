import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put, Query,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ParameterConverterPipe} from '../../../core/pipes/parameter-converter.pipe';
import {PublicConversationMessageService} from '../../services/public-conversation-message.service';
import {PublicConversationMessage} from '../../../entity/models/public-conversation-message.entity';
import {User as CurrentUser} from '../../../core/decorators/user.decorator';
import {ClientUser} from '../../../entity/models/client-user.entity';
import {PublicConversation} from '../../../entity/models/public-conversation.entity';
import {DateTimePipe} from '../../../core/pipes/date-time.pipe';

@UseGuards(AuthGuard())
@Controller('client/public-conversation-message')
export class PublicConversationMessageController {

    constructor(
        private readonly service: PublicConversationMessageService,
    ) {
    }

    @Get(':conversationId/messages')
    public async getList(
        @Param('conversationId', ParameterConverterPipe) conversation: PublicConversation,
        @Query('lastCreated', DateTimePipe) lastCreatedAt: Date
    )
    {
        const list: PublicConversationMessage[] = await this.service.getList(conversation, lastCreatedAt);
        return {
            list: list.map(item => item.serialize())
        };
    }

    @Delete(':id')
    @HttpCode(200)
    public async remove(
        @Param('id', ParameterConverterPipe) message: PublicConversationMessage,
        @CurrentUser() user: ClientUser
    )
    {
        await this.service.remove(message, user);
    }

}
