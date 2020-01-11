import { hash, compare } from 'bcrypt';
import * as sha256 from 'crypto-js/sha256';
import {BadRequestException, Inject, Injectable} from '@nestjs/common';
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
import {UserConfirmRegisterDto} from '../dto/user-confirm-register.dto';
import {JwtService} from '@nestjs/jwt';
import {EmailPasswordCredentialsDto} from '../dto/email-password-credentials.dto';

@Injectable()
export class SecurityService
{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(ConfirmationKey)
        private readonly securityKeyRepository: Repository<ConfirmationKey>,

        @InjectRepository(Language)
        private readonly languageRepository: Repository<Language>,

        @InjectRepository(LanguageLevel)
        private readonly languageLevelRepository: Repository<LanguageLevel>,

        @InjectEntityManager()
        private readonly entityManager: EntityManager,

        @Inject('EmailService')
        private readonly emailService: EmailServiceInterface,

        private readonly jwtService: JwtService,

        private readonly config: ConfigService,

    ) {
    }

    static PASSWORD_HASH_SALT = 10;

    public async register(data: EmailRegisterData)
    {
        let confirmationKey: ConfirmationKey = null;

        const result: ClientUser = await this.entityManager.transaction(async manager  => {

            // create a new client user
            const result: ClientUser = await this.createClientUser(data, manager);

            // create a confirmation email key
            confirmationKey = await this.createEmailConfirmationKey(result, manager);

            return result;

        });

        // send the confirmation email message
        await this.sendEmailConfirmationMessage(result, confirmationKey);

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

        user.confirmationKeys = [result];

        await manager.save(result);

        return result;
    }

    private async sendEmailConfirmationMessage(user: ClientUser, key: ConfirmationKey): Promise<void>
    {
        await (new SendConfirmationAccountOperation(this.emailService, this.config))
            .setUser(user)
            .setConfirmationKey(key)
            .run();
    }


    private generateRandomHash(): string
    {
        return sha256((+new Date()) + '' + Math.random()).toString();
    }

    public async getActiveUserByEmail(email: string)
    {
        return await this.userRepository.findOne({ email, isActive: true });
    }

    public async confirmUserAccount(data: UserConfirmRegisterDto): Promise<ClientUser>
    {
        const { key } = data;

        return await this.entityManager.transaction(async manager => {

            const keyRepository = manager.getRepository(ConfirmationKey);

            const keyEntity: ConfirmationKey = await keyRepository.findOne({
                value: key,
                isActive: true,
                type: ConfirmationKey.TYPE_REGISTRATION
            });

            keyEntity.isActive = false;
            await manager.save(keyEntity);

            keyEntity.user.isActive = true;
            await manager.save(keyEntity);

            return keyEntity.user;
        });
    }

    public async getUserToken(user: User): Promise<string>
    {
        return await this.jwtService.signAsync({id: user.id});
    }

    public async loginByEmail(data: EmailPasswordCredentialsDto): Promise<string>
    {
        // get user by email
        const user: User = await this.userRepository.findOne({
            email: data.email,
            isActive: true
        });
        if (!user)
        {
            throw new BadRequestException('Bad credentials!');
        }
        if ((user instanceof ClientUser) && user.isBlocked)
        {
            throw new BadRequestException('Your account has been blocked!');
        }

        // compare plain password with hash in the database
        const isEquals: boolean = await compare(data.password, user.password);
        if (!isEquals)
        {
            throw new BadRequestException('Bad credentials!');
        }

        // get user token by user
        return await this.getUserToken(user);
    }
}
