import {ChildEntity, Column, OneToMany} from 'typeorm';
import {User} from './user.entity';
import {ConfirmationKey} from './confirmation-key.entity';

@ChildEntity()
export class ClientUser extends User
{
    @Column({ type: 'bool', default: false })
    isBlocked: boolean;

    @OneToMany(type => ConfirmationKey, key => key.user)
    confirmationKeys: ConfirmationKey[];
}
