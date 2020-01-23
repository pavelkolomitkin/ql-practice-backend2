import {BadRequestException, Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {User as CurrentUser} from '../../../core/decorators/user.decorator';
import {TextMessageDto} from '../../dto/public-conversation/text-message.dto';
import {PublicConversation} from '../../../entity/models/public-conversation.entity';
import {ParameterConverterPipe} from '../../../core/pipes/parameter-converter.pipe';
import {ClientUser} from '../../../entity/models/client-user.entity';
import PhotoFileInterceptor from '../../middlewares/upload-photo.interceptor';
import {PublicConversationMessageService} from '../../services/public-conversation-message.service';
import {Photo} from '../../../entity/models/photo.entity';

@UseGuards(AuthGuard())
@Controller('client/public-conversation-message')
export class PublicConversationMessageController {

    constructor(
        private readonly service: PublicConversationMessageService
    ) {
    }

    @Post('/text')
    public async createTextMessage(
        @Body() data: TextMessageDto,
        @Body('text') text: string,
        @Body('conversation', ParameterConverterPipe) conversation: PublicConversation,
        @CurrentUser() user: ClientUser
    )
    {
        const message = await this.service.createTextMessage(conversation, user, text);

        return {
            message: message.serialize(['mine'])
        };
    }

    @Post('/picture')
    @UseInterceptors(PhotoFileInterceptor({ fieldName: 'image' }))
    public async createPictureMessage(
        @UploadedFile() file,
        @Body('conversation', ParameterConverterPipe) conversation: PublicConversation,
        @CurrentUser() user: ClientUser
    )
    {
        const message = await this.service.createPictureMessage(conversation, user, Photo.createFromUploadedFile(file));

        return {
            message: message.serialize(['mine'])
        };
    }

    @Post('/voice')
    public createVoice()
    {
        throw new BadRequestException('You cannot send the voice messages yet!');
    }
}
