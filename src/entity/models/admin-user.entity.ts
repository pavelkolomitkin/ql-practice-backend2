import {User} from './user.entity';
import {ChildEntity} from 'typeorm';
import {Exclude} from 'class-transformer';

@Exclude()
@ChildEntity()
export class AdminUser extends User
{
}
