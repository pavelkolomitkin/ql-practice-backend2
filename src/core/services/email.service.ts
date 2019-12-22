import {EmailServiceInterface} from './email-service.interface';
import {ConfigService} from '../../config/config.service';
import {EmailMessage} from '../email/email.message';

export abstract class EmailService implements EmailServiceInterface {
    constructor(
        protected readonly config: ConfigService
    ) {
    }

    public abstract async send(message: EmailMessage);
}
