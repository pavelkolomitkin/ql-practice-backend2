import {Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import PhotoFileInterceptor from '../../middlewares/upload-photo.interceptor';
import {ParameterConverterPipe} from '../../../core/pipes/parameter-converter.pipe';
import {PublicConversation} from '../../../entity/models/public-conversation.entity';
import {User as CurrentUser} from '../../../core/decorators/user.decorator';
import {ClientUser} from '../../../entity/models/client-user.entity';
import {Photo} from '../../../entity/models/photo.entity';
import {PublicConversationPictureMessageService} from '../../services/public-conversation-picture-message.service';

@UseGuards(AuthGuard())
@Controller('client/public-conversation-message/picture')
export class PictureMessageController
{
    constructor(
        private readonly service: PublicConversationPictureMessageService
    ) {
    }

    @Post()
    @UseInterceptors(PhotoFileInterceptor({ fieldName: 'image' }))
    public async create(
        @UploadedFile() file,
        @Body('conversation', ParameterConverterPipe) conversation: PublicConversation,
        @CurrentUser() user: ClientUser
    )
    {
        const message = await this.service.create(conversation, user, Photo.createFromUploadedFile(file));

        return {
            message: message.serialize(['mine'])
        };
    }
}