import {Body, Controller, HttpCode, Post} from '@nestjs/common';
import {FacebookCredentials} from '../dto/facebook-credentials.dto';
import {FacebookService} from '../services/facebook.service';
import {User} from '../../entity/models/user.entity';

@Controller('facebook-account')
export class FacebookAccountController {

    constructor(
        private readonly service: FacebookService
    ) {
    }

    @Post('login')
    @HttpCode(200)
    public async login(@Body() data: FacebookCredentials)
    {
        const user: User = await this.service.updateUser(data);
        const token: string = await this.service.getUserToken(user);

        return {
            token,
            user: user.serialize(['mine'])
        };
    }
}
