import {BadRequestException, Injectable} from '@nestjs/common';
import {LanguageSkillDto} from '../dto/language-skill.dto';
import {ClientUser} from '../../entity/models/client-user.entity';
import {InjectEntityManager, InjectRepository} from '@nestjs/typeorm';
import {LanguageSkill} from '../../entity/models/language-skill.entity';
import {EntityManager, In, Repository} from 'typeorm';
import {Language} from '../../entity/models/language.entity';
import {LanguageLevel} from '../../entity/models/language-level.entity';
import {TopicTag} from '../../entity/models/topic-tag.entity';
import {TopicTagService} from './topic-tag.service';

@Injectable()
export class LanguageSkillService {

    constructor(
        @InjectRepository(LanguageSkill)
        private readonly skillRepository: Repository<LanguageSkill>,

        @InjectRepository(TopicTag)
        private readonly tagRepository: Repository<TopicTag>,

        @InjectEntityManager()
        private readonly entityManager: EntityManager,

        private readonly tagService: TopicTagService
    ) {
    }

    public async create(user: ClientUser, language: Language, level: LanguageLevel, tags: Array<string>): Promise<LanguageSkill>
    {
        let result: LanguageSkill = null;

        await this.entityManager.transaction(async (manager) => {

            let skill: LanguageSkill = await manager.getRepository(LanguageSkill).findOne({
                user,
                language
            });
            if (skill)
            {
                throw new BadRequestException({
                    'language': 'You already have that skill!'
                });
            }

            skill = new LanguageSkill();
            skill.language = language;
            skill.level = level;
            skill.user = user;

            await manager.save(skill);
            result = skill;
        });

        return result;
    }

    public async update(user: ClientUser, skill: LanguageSkill, level: LanguageLevel, tags: Array<string>): Promise<LanguageSkill>
    {
        if (skill.user.id !== user.id)
        {
            throw new BadRequestException({
                'language': 'You cannot edit this skill!'
            });
        }

        await this.entityManager.transaction(async (manager) => {

            skill.level = level;

            await manager.save(skill);
        });

        // skill.tags = await this.tagService.getOrCreateTags(tags);
        // await this.entityManager.save(skill);

        return skill;
    }

    public async remove(user: ClientUser, skill: LanguageSkill): Promise<void>
    {
        if (skill.user.id !== user.id)
        {
            throw new BadRequestException({
                'language': 'You cannot remove this skill!'
            });
        }
        await this.entityManager.remove(skill);
    }

}
