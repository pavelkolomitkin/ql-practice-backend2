import {Controller, Get, Query, UseGuards} from '@nestjs/common';
import {TopicTagService} from '../services/topic-tag.service';
import {TopicTag} from '../../entity/models/topic-tag.entity';
import {AuthGuard} from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('client/topic-tag')
export class TopicTagController {

    constructor(
        private readonly service: TopicTagService
    ) {
    }

    @Get('search')
    public async search(
        @Query('title') title: string
    )
    {
        const tags: Array<TopicTag> = await this.service.search({
            title
        });

        return {
            tags: tags.map(tag => tag.serialize())
        };
    }
}
