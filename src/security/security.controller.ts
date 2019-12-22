import {Controller, Get, Post} from '@nestjs/common';

@Controller('security')
export class SecurityController {

    @Post('/register')
    public register()
    {

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
