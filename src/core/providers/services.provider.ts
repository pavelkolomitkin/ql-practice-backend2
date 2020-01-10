import {Provider} from '@nestjs/common';
import {ConfigService} from '../../config/config.service';
import {EmailServiceInterface} from '../services/email-service.interface';
import {FileStoreEmailService} from '../services/file-store-email.service';
import {SendPulseEmailService} from '../services/send-pulse-email.service';

export const providers: Provider[] = [
    {
        provide: 'EmailService',
        inject: [ConfigService],
        useFactory: (configService: ConfigService): EmailServiceInterface => {
            return configService.get('NODE_ENV', 'dev') === 'dev' ?
                (new FileStoreEmailService(configService))
                : (new SendPulseEmailService(configService));
        },
    },
];