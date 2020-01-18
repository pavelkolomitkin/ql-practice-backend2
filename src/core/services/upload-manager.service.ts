import {HttpService, Injectable} from '@nestjs/common';
import {ConfigService} from '../../config/config.service';
import {CoreException} from '../exceptions/core.exception';
import * as fsx from 'fs-extra';
import {User} from '../../entity/models/user.entity';
import {ClientUser} from '../../entity/models/client-user.entity';
import * as fs from 'fs';
import {promisify} from 'util';
const fileExistsAsync = promisify(fs.stat);

@Injectable()
export class UploadManagerService
{
    constructor(
        private readonly config: ConfigService,
        private readonly httpService: HttpService
        ) {}

    async removeUserPhoto(user: User)
    {
        if (!user.hasPhoto())
        {
            throw new CoreException('User has no photo!');
        }

        const file = this.config.get('UPLOAD_PHOTO_DIRECTORY') + '/' + user.photo.filename;
        if (!await fsx.pathExists(file))
        {
            throw new CoreException('User has no photo!');
        }

        await fsx.remove(file);
    }

    async importPictureFromFaceBook(user: ClientUser): Promise<string>
    {
        if (!user.facebook || !user.facebook.picture)
        {
            return null;
        }

        try {
            await this.removeUserPhoto(user);
        }
        catch (e) {}

        const fileName: string = user.id + '_facebook_' + (+new Date());
        // generate random filename based on the user id
        const filePath = process.env.UPLOAD_PHOTO_DIRECTORY + '/' + fileName;

        try {
            await fileExistsAsync(process.env.UPLOAD_PHOTO_DIRECTORY);
        }
        catch (e) {
            try {
                await fs.promises.mkdir(process.env.UPLOAD_PHOTO_DIRECTORY, { recursive: true });
            }
            catch (e) {
                return null;
            }
        }

        const fileWriter = fsx.createWriteStream(filePath);

        const response = await this.httpService.axiosRef({
            url: user.facebook.picture.data.url,
            method: 'GET',
            responseType: 'stream',
        });

        response.data.pipe(fileWriter);

        return new Promise((resolve, reject) => {

            fileWriter.on('finish', () => {
                resolve(fileName);
            });
            fileWriter.on('error', reject);
        });
    }
}
