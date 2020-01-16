import {User} from '../../entity/models/user.entity';
import {JwtService} from '@nestjs/jwt';

export class SecurityBaseService
{
    constructor(
        protected readonly jwtService: JwtService,
    ) {
    }

    public async getUserToken(user: User): Promise<string>
    {
        return await this.jwtService.signAsync({id: user.id});
    }
}