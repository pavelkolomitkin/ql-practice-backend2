import {EmailServiceInterface} from '../services/email-service.interface';
import {ConfigService} from '../../config/config.service';

export abstract class EmailMessageOperation {

    constructor(
        protected readonly service: EmailServiceInterface,
        protected readonly config: ConfigService
    ) {
    }

    public abstract async run();
}
