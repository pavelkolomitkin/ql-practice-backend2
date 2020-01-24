import {ChildEntity, Column, OneToMany} from 'typeorm';
import {User} from './user.entity';
import { FacebookUser } from './facebook-user.entity';
import {ConfirmationKey} from './confirmation-key.entity';
import {LanguageSkill} from './language-skill.entity';
import {Exclude, Expose, plainToClass} from 'class-transformer';
import {PublicConversation} from './public-conversation.entity';

@Exclude()
@ChildEntity()
export class ClientUser extends User
{
    @Expose()
    @Column({ type: 'text', nullable: true })
    aboutMe: string;

    @OneToMany(type => ConfirmationKey, key => key.user)
    confirmationKeys: ConfirmationKey[];

    @Expose()
    @OneToMany(type => LanguageSkill, skill => skill.user, { eager: true})
    skills: LanguageSkill[];

    @Expose({ groups: ['mine', 'admin'] })
    @Column(type => FacebookUser, { prefix: 'facebook' })
    facebook: FacebookUser;

    removePhoto() {

        super.removePhoto();

        this.facebook.picture = {};
    }

    serialize(groups: Array<string> = []): Object {
        return {
            ...super.serialize(groups),
            ...plainToClass(ClientUser, this, { groups })
        };
    }
}
