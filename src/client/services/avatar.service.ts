import { Injectable } from '@nestjs/common';
import {ClientUser} from '../../entity/models/client-user.entity';
import {UserPhoto} from '../../entity/models/user-photo.entity';
import {UploadManagerService} from '../../core/services/upload-manager.service';
import {ImageThumbService} from '../../core/services/image-thumb.service';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class AvatarService {

    constructor(
        private readonly uploadManager: UploadManagerService,
        private readonly thumbService: ImageThumbService,

        @InjectRepository(ClientUser)
        private readonly userRepository: Repository<ClientUser>

    ) {
    }

    async updateUserAvatar(user: ClientUser, uploadedFile: any): Promise<ClientUser>
    {
        if (user.photo)
        {
            try {
                await this.uploadManager.removeUserPhoto(user);
                await this.thumbService.removeUserPhoto(user);
            }
            catch (e) { }
        }

        user.photo = UserPhoto.createFromUploadedFile(uploadedFile);

        await this.userRepository.save(user);

        return user;
    }

    async removeUserAvatar(user: ClientUser): Promise<ClientUser>
    {
        if (user.photo)
        {
            try {
                await this.uploadManager.removeUserPhoto(user)
            }
            catch (e) {}

            try {
                await this.thumbService.removeUserPhoto(user);
            }
            catch (e) {}

            user.photo = null;
            await this.userRepository.save(user);
        }

        return user;
    }
}
