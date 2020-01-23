import {Body, Controller, Param, Post, Put, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {TextMessageDto} from '../../dto/public-conversation/text-message.dto';
import {ParameterConverterPipe} from '../../../core/pipes/parameter-converter.pipe';
import {PublicConversation} from '../../../entity/models/public-conversation.entity';
import {User as CurrentUser} from '../../../core/decorators/user.decorator';
import {ClientUser} from '../../../entity/models/client-user.entity';
import {PublicConversationTextMessageService} from '../../services/public-conversation-text-message.service';
import {PublicConversationMessage} from '../../../entity/models/public-conversation-message.entity';

@UseGuards(AuthGuard())
@Controller('client/public-conversation-message/text')
export class TextMessageController
{
    constructor(
        private readonly service: PublicConversationTextMessageService
    ) {
    }

    @Post()
    public async create(
        @Body() data: TextMessageDto,
        @Body('text') text: string,
        @Body('conversation', ParameterConverterPipe) conversation: PublicConversation,
        @CurrentUser() user: ClientUser
    )
    {
        const message = await this.service.create(conversation, user, text);

        return {
            message: message.serialize(['mine'])
        };
    }

    @Put(':id/update')
    public async update(
        @Param('id', ParameterConverterPipe) message: PublicConversationMessage,
        @Body() data: TextMessageDto,
        @Body('text') text: string,
        @Body('conversation', ParameterConverterPipe) conversation: PublicConversation,
        @CurrentUser() user: ClientUser
    )
    {
        await this.service.update(message, user, text);

        return {
            message: message.serialize(['mine'])
        };
    }
}