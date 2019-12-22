import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {ClientUser} from './client-user.entity';

@Entity()
export class ConfirmationKey
{
    static TYPE_REGISTRATION = 'registration';
    static TYPE_PASSWORD_RESTORE = 'password-restore';

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 20 })
    type: string;

    @Column({ type: 'char', length: 64 })
    value: string;

    @Column({ type: 'bool', default: true })
    isActive: boolean;

    @ManyToOne(type => ClientUser, user => user.confirmationKeys)
    user: ClientUser;
}
