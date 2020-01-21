import {Body, Controller, Delete, HttpCode, Post, Put, UseGuards} from '@nestjs/common';
import {LanguageSkillDto} from '../dto/language-skill.dto';
import {ClientUser} from '../../entity/models/client-user.entity';
import {User as CurrentUser} from '../../core/decorators/user.decorator';
import {LanguageSkillService} from '../services/language-skill.service';
import {LanguageSkill} from '../../entity/models/language-skill.entity';
import {Language} from '../../entity/models/language.entity';
import {ParameterConverterPipe} from '../../core/pipes/parameter-converter.pipe';
import {LanguageLevel} from '../../entity/models/language-level.entity';
import {AuthGuard} from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('client/language-skill')
export class LanguageSkillController {

    constructor(
        private readonly service: LanguageSkillService
    ) {
    }

    @Post()
    public async create(
        @Body() data: LanguageSkillDto,
        @Body('language', ParameterConverterPipe) language: Language,
        @Body('level', ParameterConverterPipe) level: LanguageLevel,
        @Body('tags') tags: Array<string>,
        @CurrentUser() user: ClientUser)
    {
        const skill: LanguageSkill = await this.service.create(user, language, level, tags);

        return {
            skill: skill.serialize()
        }
    }

    @Put(':id')
    public async update(
        @Body('id', ParameterConverterPipe) skill: LanguageSkill,
        @Body('level', ParameterConverterPipe) level: LanguageLevel,
        @Body('tags') tags: Array<string>,
        @CurrentUser() user: ClientUser
    )
    {
        await this.service.update(user, skill, level, tags);

        return {
            skill: skill.serialize()
        }
    }

    @Delete(':id')
    @HttpCode(200)
    public async remove(
        @Body('id', ParameterConverterPipe) skill: LanguageSkill,
        @CurrentUser() user: ClientUser
    )
    {
        await this.service.remove(user, skill);
    }
}
