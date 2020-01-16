import {Inject, Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {SecurityService} from './security.service';

@Injectable()
export class JwtAuthService
{
    constructor(
        private jwtService: JwtService,
        @Inject() private readonly service: SecurityService
    ) {}

    async getUser(token: string)
    {
        const payload = await this.jwtService.verify(token);
        if (!payload)
        {
            return null;
        }

        const { email } = payload;
        return await this.service.getActiveUserByEmail(email);
    }
}
