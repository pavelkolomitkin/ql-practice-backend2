import { Injectable } from '@nestjs/common';
import {ClientUser} from '../../entity/models/client-user.entity';
import {UserPhoto} from '../../entity/models/user-photo.entity';
import {UploadManagerService} from '../../core/services/upload-manager.service';
import {ImageThumbService} from '../../core/services/image-thumb.service';
import {InjectEntityManager, InjectRepository} from '@nestjs/typeorm';
import {EntityManager, Repository} from 'typeorm';

@Injectable()
export class AvatarService {

    constructor(
        private readonly uploadManager: UploadManagerService,
        private readonly thumbService: ImageThumbService,

        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        @InjectRepository(ClientUser)
        private readonly userRepository: Repository<ClientUser>

    ) {
    }

    async updateUserPhoto(user: ClientUser, uploadedFile: any): Promise<ClientUser>
    {
        if (user.hasPhoto())
        {
            try {
                await this.uploadManager.removeUserPhoto(user);
                await this.thumbService.removeUserPhoto(user);
            }
            catch (e) { }
        }

        user.photo = UserPhoto.createFromUploadedFile(uploadedFile);

        await this.entityManager.save(user);

        return user;
    }

    async removeUserPhoto(user: ClientUser): Promise<ClientUser>
    {
        if (user.hasPhoto())
        {
            try {
                await this.uploadManager.removeUserPhoto(user)
            }
            catch (e) {}

            try {
                await this.thumbService.removeUserPhoto(user);
            }
            catch (e) {}

            user.removePhoto();
            user.facebook.picture = null; // TODO move it to the sub class

            await this.entityManager.save(user);
        }

        return user;
    }
}
