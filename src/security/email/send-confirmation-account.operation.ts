import {EmailMessageOperation} from '../../core/email/email-message.operation';
import {ClientUser} from '../../entity/models/client-user.entity';
import {EmailMessage} from '../../core/email/email.message';

export class SendConfirmationAccountOperation extends EmailMessageOperation
{
    private user: ClientUser;

    public setUser(user: ClientUser)
    {
        this.user = user;

        return this;
    }

    async run() {

        const message = new EmailMessage();

        message.to = this.user.email;
        //message.content = 'Well'

        //this.service.send()
    }

    private getConfirmationLink()
    {
        return
    }

}
