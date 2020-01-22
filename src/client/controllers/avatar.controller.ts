import {Controller, Delete, Post, Put, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {User as CurrentUser} from '../../core/decorators/user.decorator';
import {ClientUser} from '../../entity/models/client-user.entity';
import {AvatarService} from '../services/avatar.service';
import PhotoFileInterceptor from '../middlewares/upload-photo.interceptor';
import {AuthGuard} from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('client/photo')
export class AvatarController {

    constructor(
        private readonly avatarService: AvatarService
    ) {
    }
    @Post('upload')
    @UseInterceptors(PhotoFileInterceptor({ fieldName: 'image' }))
    public async upload(@UploadedFile() file, @CurrentUser() user: ClientUser)
    {
        await this.avatarService.updateUserPhoto(user, file);

        return user.serialize(['mine']);
    }

    @Put('remove')
    public async remove(@CurrentUser('client') user: ClientUser)
    {
        await this.avatarService.removeUserPhoto(user);

        return user.serialize(['mine']);
    }
}
