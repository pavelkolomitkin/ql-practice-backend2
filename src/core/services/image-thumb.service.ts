import * as fs from 'fs';
import * as fsx from 'fs-extra';
import {promisify} from 'util';
const fileExistsAsync = promisify(fs.stat);
import * as sharp from 'sharp';

import {Injectable} from '@nestjs/common';
import {ConfigService} from '../../config/config.service';
import {CoreException} from '../exceptions/core.exception';
import {User} from '../../entity/models/user.entity';

@Injectable()
export class ImageThumbService
{
    constructor(private readonly config: ConfigService) {}

    async getUserPhoto(user: User, size: string): Promise<string>
    {
        if (!user.hasPhoto())
        {
            throw new CoreException('User has no photo!');
        }

        const thumbConfig = this.config.getThumbConfig();
        const photoSizes = thumbConfig['photo'][size];
        if (!photoSizes)
        {
            throw new CoreException('Invalid size!');
        }

        const originalFile = this.config.get('UPLOAD_PHOTO_DIRECTORY') + '/' + user.photo.filename;

        try {
            await fileExistsAsync(originalFile);
        }
        catch (error) {
            throw new CoreException('System Error');
        }

        const directoryPath = this.config.get('IMAGE_THUMB_DIRECTORY') + '/photo/' + user.id + '/' + user.photo.filename;
        try {
            await fileExistsAsync(directoryPath);
        }
        catch (directoryException) {

            try {
                await fs.promises.mkdir(directoryPath, { recursive: true });
            }
            catch (directoryCreateError) {
                throw new CoreException('Can not get file!');
            }

        }


        const filePath = directoryPath + '/' + size;
        try {
            await fileExistsAsync(filePath);
        }
        catch (error) {

            // there should be a file exist called /app/thumbs/avatar/:userId/:originalFileName/:size
            // if the target thumb file doesn't exist
            // make thumb for certain size
            try {
                await sharp(originalFile)
                    .resize(photoSizes.width, photoSizes.height)
                    .toFile(filePath);
            }
            catch (thumbError) {
                throw new CoreException('Can not get file!');
            }

        }

        return filePath;
    }

    async removeUserPhoto(user: User)
    {
        const directoryPath = this.config.get('IMAGE_THUMB_DIRECTORY') + '/avatar/' + user.id;
        try {
            await fileExistsAsync(directoryPath);
            await fsx.remove(directoryPath);
        }
        catch (error) {
            throw new CoreException('Can not remove this photo!');
        }
    }
}
