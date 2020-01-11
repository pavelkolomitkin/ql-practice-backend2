import {EmailMessageOperation} from '../../core/email/email-message.operation';
import {ClientUser} from '../../entity/models/client-user.entity';
import {EmailMessage} from '../../core/email/email.message';
import {ConfirmationKey} from '../../entity/models/confirmation-key.entity';

export class SendConfirmationAccountOperation extends EmailMessageOperation
{
    private user: ClientUser;

    private key: ConfirmationKey;

    public setUser(user: ClientUser)
    {
        this.user = user;

        return this;
    }

    public setConfirmationKey(key: ConfirmationKey)
    {
        this.key = key;

        return this;
    }

    async run() {

        const message = new EmailMessage();

        message.to = this.user.email;
        message.from = this.config.get('EMAIL_NO_REPLY');
        message.subject = 'Welcome to QL Practice';
        message.content = `
            Welcome to QL Practice! Please, confirm your account by the <a href="${this.getConfirmationLink()}">link</a>    
        `;

        await this.service.send(message);
    }

    private getConfirmationLink()
    {
        // EMAIL_LINK_HOST
        return this.config.get('EMAIL_LINK_HOST') + '/security/confirm?key=' + this.key.value
    }

}
