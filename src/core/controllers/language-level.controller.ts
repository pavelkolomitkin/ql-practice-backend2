import {Controller, Get} from '@nestjs/common';
import {Repository} from 'typeorm';
import {LanguageLevel} from '../../entity/models/language-level.entity';
import {InjectRepository} from '@nestjs/typeorm';

@Controller('language-level')
export class LanguageLevelController {

    constructor(
        @InjectRepository(LanguageLevel)
        private readonly repository: Repository<LanguageLevel>
    ) {
    }

    @Get('/list')
    public getList()
    {
        return this.repository.find({
            order: {
                level: 'ASC'
            }
        });
    }
}
