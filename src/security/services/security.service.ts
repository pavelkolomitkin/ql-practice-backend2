import { hash, compare } from 'bcrypt';
import * as sha256 from 'crypto-js/sha256';
import {Inject, Injectable} from '@nestjs/common';
import {EmailRegisterData} from '../dto/email-register-data.dto';
import {EntityManager, Repository, TransactionManager} from 'typeorm';
import {Language} from '../../entity/models/language.entity';
import {InjectEntityManager, InjectRepository} from '@nestjs/typeorm';
import {LanguageLevel} from '../../entity/models/language-level.entity';
import {LanguageSkill} from '../../entity/models/language-skill.entity';
import {ClientUser} from '../../entity/models/client-user.entity';
import {ConfirmationKey} from '../../entity/models/confirmation-key.entity';
import {EmailServiceInterface} from '../../core/services/email-service.interface';
import {SendConfirmationAccountOperation} from '../email/send-confirmation-account.operation';
import {User} from '../../entity/models/user.entity';
import {ConfigService} from '../../config/config.service';

@Injectable()
export class SecurityService
{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Language)
        private readonly languageRepository: Repository<Language>,
        @InjectRepository(LanguageLevel)
        private readonly languageLevelRepository: Repository<LanguageLevel>,
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        @Inject('EmailService')
        private readonly emailService: EmailServiceInterface,
        private config: ConfigService,

    ) {
    }

    static PASSWORD_HASH_SALT = 10;

    public async register(data: EmailRegisterData)
    {
        const result: ClientUser = await this.entityManager.transaction(async manager  => {

            // create a new client user
            const result: ClientUser = await this.createClientUser(data, manager);

            // create a confirmation email key
            await this.createEmailConfirmationKey(result, manager);

            return result;

        });

        // send the confirmation email message
        await this.sendEmailConfirmationMessage(result);

        return result;
    }

    private async createClientUser(data: EmailRegisterData, manager: EntityManager): Promise<ClientUser>
    {
        const { email, password, fullName, nativeLanguage, practiceLanguage, practiceLanguageLevel } = data;

        const result = new ClientUser();

        result.email = email;
        result.password = await hash(password, SecurityService.PASSWORD_HASH_SALT);
        result.fullName = fullName;

        const nativeSkill: LanguageSkill = new LanguageSkill();
        nativeSkill.language = await this.languageRepository.findOne(nativeLanguage);
        nativeSkill.level = await this.languageLevelRepository.findOne({ code: LanguageLevel.NATIVE_CODE });

        const practiceSkill: LanguageSkill = new LanguageSkill();
        practiceSkill.language = await this.languageRepository.findOne(practiceLanguage);
        practiceSkill.level = await this.languageLevelRepository.findOne(practiceLanguageLevel);

        result.skills = [ nativeSkill, practiceSkill ];

        await manager.save(result);

        return result;
    }

    private async createEmailConfirmationKey(user: ClientUser, manager: EntityManager): Promise<ConfirmationKey>
    {
        const result = new ConfirmationKey();

        result.value = this.generateRandomHash();
        result.user = user;
        result.isActive = true;
        result.type = ConfirmationKey.TYPE_REGISTRATION;

        user.confirmationKeys.push(result);

        await manager.save(result);

        return result;
    }

    private async sendEmailConfirmationMessage(user: ClientUser): Promise<void>
    {
        await (new SendConfirmationAccountOperation(this.emailService, this.config))
            .setUser(user)
            .run();
    }


    private generateRandomHash()
    {
        return sha256((+new Date()) + '' + Math.random());
    }

    public async getActiveUserByEmail(email: string)
    {
        return await this.userRepository.findOne({ email, isActive: true });
    }
}
