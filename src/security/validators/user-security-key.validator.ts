import {ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from 'class-validator';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ConfirmationKey} from '../../entity/models/confirmation-key.entity';
import {Repository} from 'typeorm';
// import {RegisterKey} from '../../core/models/register-key.model';
// import * as mongoose from 'mongoose';

@Injectable()
@ValidatorConstraint({ name: 'UserSecurityKey', async: true })
export class UserSecurityKey implements ValidatorConstraintInterface
{

    constructor(
        @InjectRepository(ConfirmationKey)
        private readonly repository: Repository<ConfirmationKey>
    ) {
    }


    defaultMessage(validationArguments?: ValidationArguments): string {
        return 'The key is not valid!';
    }

    async validate(value: string, validationArguments?: ValidationArguments): Promise<boolean> {

        let [ keyType ] = validationArguments.constraints;

        const key = await this.repository.findOne({type: keyType, value: value, isActive: true});

        return !!key;
    }

}
