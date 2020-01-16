import {ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from 'class-validator';
import {EntityManager} from 'typeorm';
import {InjectEntityManager} from '@nestjs/typeorm';

@ValidatorConstraint({ name: 'EntityExistsValidator', async: true })
export class EntityExistsValidator implements ValidatorConstraintInterface
{
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager
    ) {
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return 'This does not exist!';
    }

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {

        let [ ModelClass, fieldName ] = validationArguments.constraints;

        const repository = this.entityManager.getRepository(ModelClass);

        const entity = await repository.findOne({[fieldName]: value});

        return !!entity;
    }
}
