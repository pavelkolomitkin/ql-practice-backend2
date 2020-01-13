import {IsEmail} from 'class-validator';

export class UserRestorePasswordRequestDto
{
    @IsEmail()
    public email: string;
}
