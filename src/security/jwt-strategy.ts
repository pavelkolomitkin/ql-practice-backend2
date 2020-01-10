import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import {JwtPayload} from './models/jwt-payload.model';
import {SecurityService} from './services/security.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)
{
    constructor(
        private readonly securityService: SecurityService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.APP_SECRET
        });
    }

    async validate({ email }: JwtPayload)
    {
        const user = await this.securityService.getActiveUserByEmail(email);
        if (!user)
        {
            throw new UnauthorizedException();
        }

        return user;
    }
}
