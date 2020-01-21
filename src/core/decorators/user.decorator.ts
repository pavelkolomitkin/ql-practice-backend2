import {createParamDecorator} from '@nestjs/common';
import {ClientUser} from '../../entity/models/client-user.entity';

export const User = createParamDecorator((data, { user }) => user);