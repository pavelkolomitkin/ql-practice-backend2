import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {SecurityService} from './security.service';
import {UserService} from '../../core/services/user.service';

@Injectable()
export class JwtAuthService
{
    constructor(
        private jwtService: JwtService,
        private userService: UserService
    ) {}

    async getUser(token: string)
    {
        const payload = await this.jwtService.verify(token);
        if (!payload)
        {
            return null;
        }

        const { email } = payload;
        return await this.userService.getActiveByEmail(email);
    }
}
