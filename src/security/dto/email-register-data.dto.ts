import {IsEmail, IsNotEmpty, MaxLength, MinLength, Validate} from 'class-validator';
import {UniqueUserEmailValidator} from '../validators/unique-user-email.validator';
import {UserPasswordsEqualValidator} from '../validators/user-passwords-equal.validator';
import {EntityExistsValidator} from '../../core/validators/entity-exists.validator';
import {Language} from '../../entity/models/language.entity';
import {LanguageLevel} from '../../entity/models/language-level.entity';

export class EmailRegisterData
{
    @IsEmail()
    @Validate(UniqueUserEmailValidator)
    email: string;

    @MinLength(6, { message: 'Minimum 6 symbols!' })
    @Validate(UserPasswordsEqualValidator)
    password: string;

    @MinLength(6, { message: 'Minimum 6 symbols!' })
    passwordRepeat: string;

    @IsNotEmpty()
    @MaxLength(250, { message: 'Maximum 250 symbols!' })
    fullName: string;

    @Validate(EntityExistsValidator, [Language, 'id'], { message: 'Select the language!' })
    nativeLanguage: number;

    @Validate(EntityExistsValidator, [Language, 'id'], { message: 'Select the language!' })
    practiceLanguage: number;

    @Validate(EntityExistsValidator, [LanguageLevel, 'id'], { message: 'Select the language level!' })
    practiceLanguageLevel: number;
}
