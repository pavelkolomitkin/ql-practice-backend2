import {User} from './user.entity';
import {ClientUser} from './client-user.entity';
import {AdminUser} from './admin-user.entity';

export type UserType = ClientUser | AdminUser;