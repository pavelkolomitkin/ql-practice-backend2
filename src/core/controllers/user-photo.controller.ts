import {Controller, Get, NotFoundException, Param, Res} from '@nestjs/common';
import {ParameterConverterPipe} from '../pipes/parameter-converter.pipe';
import {Response} from 'express';
import {ConfigService} from '../../config/config.service';
import {ImageThumbService} from '../services/image-thumb.service';
import {User} from '../../entity/models/user.entity';

@Controller('user/photo')
export class UserPhotoController
{
    constructor(
        private readonly config: ConfigService,
        private readonly thumbService: ImageThumbService) {

    }

    @Get(':userId/:pictureId/:size')
    async getThumb(
        @Param('userId', ParameterConverterPipe) user: User,
        @Param('size') size: string,
        @Res() response: Response
        )
    {
        try {
            const filePath = await this.thumbService.getUserPhoto(user, size);
            response.setHeader('Content-Type', 'image/jpeg');
            response.setHeader('X-Accel-Redirect', filePath);
            response.end('');
        }
        catch (error) {
            throw new NotFoundException();
        }

    }
}
