import {EmailServiceInterface} from './email-service.interface';
import {EmailService} from './email.service';
import {EmailMessage} from '../email/email.message';

export class ConsoleOutputEmailService extends EmailService
{
    send(message: EmailMessage) {
        console.log(message);
    }
}
