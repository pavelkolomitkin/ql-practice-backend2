import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';
import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {User} from '../../entity/models/user.entity';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
@ValidatorConstraint({ name: 'UniqueUserEmailValidator', async: false })
export class UniqueUserEmailValidator implements ValidatorConstraintInterface
{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return 'This email already exists!';
    }

    async validate(value: string, validationArguments?: ValidationArguments): Promise<boolean> {

        value = value.trim();

        const user: User = await this.userRepository.findOne({ email: value });

        return !user;
    }
}
