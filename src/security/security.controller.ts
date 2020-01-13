import {Body, Controller, Get, HttpCode, Post, Put, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {EmailRegisterData} from './dto/email-register-data.dto';
import {SecurityService} from './services/security.service';
import {UserConfirmRegisterDto} from './dto/user-confirm-register.dto';
import {User} from '../entity/models/user.entity';
import {ConfigService} from '../config/config.service';
import {EmailPasswordCredentialsDto} from './dto/email-password-credentials.dto';
import { User as CurrentUser } from '../core/decorators/user.decorator';
import {UserRestorePasswordRequestDto} from './dto/user-restore-password-request.dto';
import {UserRestorePasswordDto} from './dto/user-restore-password.dto';

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
    @HttpCode(200)
    public async login(@Body() data: EmailPasswordCredentialsDto)
    {
        const { token, user } = await this.service.loginByEmail(data);
        return { token, user: user.serialize(['mine']) };
    }

    @Post('restore-password-request')
    public async restorePasswordRequest(@Body() data: UserRestorePasswordRequestDto)
    {
        await this.service.restorePasswordRequest(data);
    }

    @Put('restore-password')
    public async restorePassword(@Body() data: UserRestorePasswordDto)
    {
        await this.service.restorePassword(data);
    }

    @UseGuards(AuthGuard())
    @Get('profile')
    public getProfile(@CurrentUser() user: User)
    {
        return {
            user: user.serialize(['mine'])
        }
    }
}
