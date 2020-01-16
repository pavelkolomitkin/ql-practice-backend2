import {Validate} from 'class-validator';
import {UserSecurityKeyValidator} from '../validators/user-security-key.validator';
import {ConfirmationKey} from '../../entity/models/confirmation-key.entity';

export class UserConfirmRegisterDto
{
    @Validate(UserSecurityKeyValidator, [ConfirmationKey.TYPE_REGISTRATION])
    public key: string;
}
