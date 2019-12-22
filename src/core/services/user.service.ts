import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {User} from '../models/user.entity';

@Injectable()
export class UserService
{
    constructor(
        private readonly repository: Repository<User>
    ) {
    }

    public async getByEmail(email: string)
    {
        return await this.repository.find({ email });
    }
}
