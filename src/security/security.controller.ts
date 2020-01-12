import {Body, ClassSerializerInterceptor, Controller, Get, Post, Put, SerializeOptions, UseInterceptors} from '@nestjs/common';
import {EmailRegisterData} from './dto/email-register-data.dto';
import {SecurityService} from './services/security.service';
import {UserConfirmRegisterDto} from './dto/user-confirm-register.dto';
import {User} from '../entity/models/user.entity';
import {ConfigService} from '../config/config.service';
import {EmailPasswordCredentialsDto} from './dto/email-password-credentials.dto';

@Controller('security')
export class SecurityController {

    constructor(
        private readonly service: SecurityService,
        private readonly config: ConfigService
    ) {
    }

    @Post('register')
    public async register(@Body() data: EmailRegisterData)
    {
        await this.service.register(data);
    }

    @Put('register-confirm')
    public async confirmRegister(@Body() data: UserConfirmRegisterDto)
    {
        // activate the key
        const user: User = await this.service.confirmUserAccount(data);
        // get user token
        const token = await this.service.getUserToken(user);

        return { token };
    }

    @Get('agreement')
    public async getAgreement()
    {
        return {
            agreement: this.config.getAgreement()
        };
    }

    @Post('login')
    public async login(@Body() data: EmailPasswordCredentialsDto)
    {
        const { token, user } = await this.service.loginByEmail(data);
        return { token, user: user.serialize() };
    }

    @Post('/restore-password')
    public restorePassword()
    {

    }

    @Get('/profile')
    public getProfile()
    {

    }
}
