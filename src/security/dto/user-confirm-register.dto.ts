import {Validate} from 'class-validator';
import {UserSecurityKey} from '../validators/user-security-key.validator';
import {ConfirmationKey} from '../../entity/models/confirmation-key.entity';

export class UserConfirmRegisterDto
{
    @Validate(UserSecurityKey, [ConfirmationKey.TYPE_REGISTRATION])
    public key: string;
}
