import { Injectable } from '@nestjs/common';
import { config as thumb } from './thumb';
import { agreement } from './agreement';

@Injectable()
export class ConfigService {

    env: any;

    constructor() {
        this.env = {...process.env};
    }

    public get(key: string, defaultValue: any = null): any
    {
        return this.env[key] || defaultValue;
    }

    public getThumbConfig()
    {
        return thumb;
    }

    public getAgreement()
    {
        return agreement;
    }
}
