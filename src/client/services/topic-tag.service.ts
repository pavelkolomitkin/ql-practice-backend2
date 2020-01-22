import {Injectable} from '@nestjs/common';
import {TopicTag} from '../../entity/models/topic-tag.entity';
const _ = require('lodash');
import {InjectRepository} from '@nestjs/typeorm';
import {FindManyOptions, In, Like, Repository} from 'typeorm';


@Injectable()
export class TopicTagService {

    static DEFAULT_LIMIT_LIST = 10;

    constructor(
        @InjectRepository(TopicTag)
        private readonly repository: Repository<TopicTag>
    ) {
    }

    public async search (criteria: { title?: string }): Promise<Array<TopicTag>>
    {
        const options: FindManyOptions<TopicTag> = {
            order: {
                title: 'ASC'
            },
            take: TopicTagService.DEFAULT_LIMIT_LIST
        };
        if (!!criteria.title && criteria.title.trim() !== '')
        {
            options['title'] = Like(criteria.title.trim() + '%')
        }

        return this.repository.find(options);
    }

    public async getOrCreateTags(tags: Array<string>): Promise<Array<TopicTag>>
    {
        tags = _.uniq(tags).map(tag => tag.trim());
        if (tags.length === 0)
        {
            return [];
        }

        const result: Array<TopicTag> = await this.repository.find({
            title: In(tags)
        });

        const unknownTags: Array<string> = tags.filter(tag => {
            return (result.findIndex(item => item.title === tag) === -1);
        });

        for (const unknownTag of unknownTags) {

            let newTag: TopicTag = new TopicTag();
            newTag.title = unknownTag;

            try {
                await this.repository.save(newTag);
            }
            catch (e) {
                newTag = await this.repository.findOne({ title: unknownTag });
            }

            if (!!newTag)
            {
                result.push(newTag);
            }
        }

        return result;
    }

}