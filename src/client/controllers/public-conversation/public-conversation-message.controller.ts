import {Controller, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('client/public-conversation-message')
export class PublicConversationMessageController {

}
