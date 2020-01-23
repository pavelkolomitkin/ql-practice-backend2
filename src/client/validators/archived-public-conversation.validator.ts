import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';
import {PublicConversation} from '../../entity/models/public-conversation.entity';


@ValidatorConstraint({ name: 'ArchivedPublicConversation', async: true })
export class ArchivedPublicConversation implements ValidatorConstraintInterface
{
    defaultMessage(validationArguments?: ValidationArguments): string {
        return 'The conversation is archived!';
    }

    validate(value: PublicConversation, validationArguments?: ValidationArguments): Promise<boolean> | boolean {

        return value.isArchived;

    }

}