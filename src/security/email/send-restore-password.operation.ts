import {SendConfirmationMessage} from './send-confirmation-message.operation';
import {EmailMessage} from '../../core/email/email.message';

export class SendRestorePasswordOperation extends SendConfirmationMessage {

    async run() {

        const message = new EmailMessage();

        message.to = this.user.email;
        message.from = this.config.get('EMAIL_NO_REPLY');
        message.subject = 'QL Practice - Password Restore';
        message.content = `
            Hello, ${this.user.fullName}! To restore your password, follow this <a href="${this.getConfirmationLink()}">link</a>    
        `;

        await this.service.send(message);
    }

    private getConfirmationLink()
    {
        // EMAIL_LINK_HOST
        return this.config.get('EMAIL_LINK_HOST') + '/security/password-restore/?key=' + this.key.value
    }

}
