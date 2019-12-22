import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtPayload} from './models/jwt-payload.model';
import {UserService} from '../core/services/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)
{
    constructor(
        @Inject() private readonly userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.APP_SECRET
        });
    }

    async validate({ email }: JwtPayload)
    {
        const user = await this.userService.getActiveByEmail(email);
        if (!user)
        {
            throw new UnauthorizedException();
        }

        return user;
    }
}
