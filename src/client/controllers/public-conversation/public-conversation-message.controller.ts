import {BadRequestException, Body, Controller, Delete, HttpCode, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ParameterConverterPipe} from '../../../core/pipes/parameter-converter.pipe';
import {PublicConversationMessageService} from '../../services/public-conversation-message.service';
import {PublicConversationMessage} from '../../../entity/models/public-conversation-message.entity';
import {User as CurrentUser} from '../../../core/decorators/user.decorator';
import {ClientUser} from '../../../entity/models/client-user.entity';

@UseGuards(AuthGuard())
@Controller('client/public-conversation-message')
export class PublicConversationMessageController {

    constructor(
        private readonly service: PublicConversationMessageService,
    ) {
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
