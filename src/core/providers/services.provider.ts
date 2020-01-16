import {Provider} from '@nestjs/common';
import {ConfigService} from '../../config/config.service';
import {EmailServiceInterface} from '../services/email-service.interface';
import {SendgridEmailService} from '../services/sendgrid-email.service';
import {ConsoleOutputEmailService} from '../services/console-output-email.service';

const providers: Provider[] = [
    {
        provide: 'EmailService',
        inject: [ConfigService],
        useFactory: (configService: ConfigService): EmailServiceInterface => {
            return parseInt(configService.get('USE_REAL_EMAIL_SERVICE', 0)) === 0 ?
                (new ConsoleOutputEmailService(configService))
                : (new SendgridEmailService(configService));
        },
    },
];



export {providers};