import {EmailService} from './email.service';
import {EmailMessage} from '../email/email.message';

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export class SendgridEmailService extends EmailService
{
    private sgMail = null;

    private getSgMail()
    {
        if (this.sgMail === null)
        {
            this.sgMail = require('@sendgrid/mail');
            sgMail.setApiKey(this.config.get('SENDGRID_API_KEY'));
        }

        return this.sgMail;
    }

    async send(message: EmailMessage): Promise<any> {

        await this.getSgMail()
            .send({
                to: message.to,
                from: message.from,
                subject: message.subject,
                //text: 'and easy to do anywhere, even with Node.js',
                html: message.content,
            })
        ;
    }
}