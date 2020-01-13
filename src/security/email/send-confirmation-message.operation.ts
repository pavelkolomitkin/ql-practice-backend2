import {EmailMessageOperation} from '../../core/email/email-message.operation';
import {ClientUser} from '../../entity/models/client-user.entity';
import {ConfirmationKey} from '../../entity/models/confirmation-key.entity';

export abstract class SendConfirmationMessage extends EmailMessageOperation
{
    protected user: ClientUser;

    protected key: ConfirmationKey;

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
}