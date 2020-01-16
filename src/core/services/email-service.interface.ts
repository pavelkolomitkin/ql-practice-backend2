import {EmailMessage} from '../email/email.message';

export interface EmailServiceInterface {
    send(message: EmailMessage)
}
