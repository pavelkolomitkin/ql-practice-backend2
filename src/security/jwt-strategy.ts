import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import {JwtPayload} from './models/jwt-payload.model';
import {SecurityService} from './services/security.service';
import {Repository} from 'typeorm';
import {User} from '../entity/models/user.entity';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)
{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly securityService: SecurityService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.APP_SECRET
        });
    }

    async validate({ id }: JwtPayload)
    {
        const user = await this.userRepository.findOne({
            id: id,
            isActive: true,
            isBlocked: false
        });
        if (!user)
        {
            throw new UnauthorizedException();
        }

        return user;
    }
}
