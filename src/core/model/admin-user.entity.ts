import {User} from './user.entity';
import {ChildEntity} from 'typeorm';

@ChildEntity()
export class AdminUser extends User
{

}
