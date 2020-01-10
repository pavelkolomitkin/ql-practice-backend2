import {Body, Controller, Get, Post, Put} from '@nestjs/common';
import {EmailRegisterData} from './dto/email-register-data.dto';
import {SecurityService} from './services/security.service';
import {UserConfirmRegisterDto} from './dto/user-confirm-register.dto';

@Controller('security')
export class SecurityController {

    constructor(
        private readonly service: SecurityService
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
        // get user token
    }

    @Post('/login')
    public login()
    {

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
