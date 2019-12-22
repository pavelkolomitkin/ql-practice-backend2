import {Body, Controller, Get, Post} from '@nestjs/common';
import {EmailRegisterData} from './dto/email-register-data.dto';
import {SecurityService} from './services/security.service';

@Controller('security')
export class SecurityController {

    constructor(
        private readonly service: SecurityService
    ) {
    }

    @Post('/register')
    public async register(@Body() data: EmailRegisterData)
    {
        await this.service.register(data);
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
