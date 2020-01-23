import {BadRequestException, Controller, Post, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('client/public-conversation-message/voice')
export class VoiceMessageController
{
    @Post('/voice')
    public create()
    {
        throw new BadRequestException('You cannot send the voice messages yet!');
    }
}