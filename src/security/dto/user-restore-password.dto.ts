import {Equals, MinLength, Validate} from 'class-validator';
import {UserPasswordsEqualValidator} from '../validators/user-passwords-equal.validator';
import {UserSecurityKeyValidator} from '../validators/user-security-key.validator';
import {ConfirmationKey} from '../../entity/models/confirmation-key.entity';

export class UserRestorePasswordDto
{
    @Validate(UserSecurityKeyValidator, [ConfirmationKey.TYPE_PASSWORD_RESTORE])
    key: string;

    @MinLength(6, { message: 'Minimum 6 symbols!' })
    @Validate(UserPasswordsEqualValidator)
    password: string;

    @MinLength(6, { message: 'Minimum 6 symbols!' })
    passwordRepeat: string;
}
