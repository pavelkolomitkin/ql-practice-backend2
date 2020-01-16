import {EmailServiceInterface} from './email-service.interface';
import {EmailService} from './email.service';
import {EmailMessage} from '../email/email.message';

export class SendPulseEmailService extends EmailService
{
    async send(message: EmailMessage): Promise<any> {
        return undefined;
    }
}
