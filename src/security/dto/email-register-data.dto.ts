import {IsEmail} from 'class-validator';

export class EmailRegisterData
{
    @IsEmail()
    email: string;

    password: string;

    passwordRepeat: string;

    fullName: string;
}
