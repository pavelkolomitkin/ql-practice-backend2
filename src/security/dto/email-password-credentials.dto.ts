import {IsEmail, IsNotEmpty} from 'class-validator';

export class EmailPasswordCredentialsDto {

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}