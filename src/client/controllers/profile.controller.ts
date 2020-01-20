import {Body, Controller, Put, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ProfileDto} from '../dto/profile.dto';
import {User as CurrentUser} from '../../core/decorators/user.decorator';
import {ClientUser} from '../../entity/models/client-user.entity';
import {InjectEntityManager} from '@nestjs/typeorm';
import {EntityManager} from 'typeorm';

@UseGuards(AuthGuard())
@Controller('client/profile')
export class ProfileController {

    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager
    ) {
    }

    @Put('/')
    async edit(@Body() data: ProfileDto, @CurrentUser('client') user: ClientUser)
    {
        user.aboutMe = data.aboutMe.trim();
        user.fullName = data.fullName.trim();

        await this.entityManager.save(user);
        return user.serialize(['mine']);
    }
}
