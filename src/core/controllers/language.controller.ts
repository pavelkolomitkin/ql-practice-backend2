import {Controller, Get} from '@nestjs/common';
import {Repository} from 'typeorm';
import {Language} from '../../entity/models/language.entity';
import {InjectRepository} from '@nestjs/typeorm';

@Controller('language')
export class LanguageController {

    constructor(
        @InjectRepository(Language)
        private readonly repository: Repository<Language>
    ) {
    }

    @Get('/list')
    public list()
    {
        return this.repository.find({
            order: {
                title: 'ASC'
            }
        });
    }
}
