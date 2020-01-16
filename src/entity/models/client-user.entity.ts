import {ChildEntity, Column, OneToMany} from 'typeorm';
import {User} from './user.entity';
import { FacebookUser } from './facebook-user.entity';
import {ConfirmationKey} from './confirmation-key.entity';
import {LanguageSkill} from './language-skill.entity';
import {Exclude, Expose, plainToClass} from 'class-transformer';

@Exclude()
@ChildEntity()
export class ClientUser extends User
{
    @OneToMany(type => ConfirmationKey, key => key.user)
    confirmationKeys: ConfirmationKey[];

    @Expose()
    @OneToMany(type => LanguageSkill, skill => skill.user, { eager: true})
    skills: LanguageSkill[];

    @Expose({ groups: ['mine', 'admin'] })
    @Column(type => FacebookUser, { prefix: 'facebook' })
    facebook: FacebookUser;

    serialize(groups: Array<string> = []): Object {
        return {
            ...super.serialize(groups),
            ...plainToClass(ClientUser, this, { groups })
        };
    }
}
