import {BadRequestException, HttpService, Injectable} from '@nestjs/common';
import {InjectEntityManager, InjectRepository} from '@nestjs/typeorm';
import {User} from '../../entity/models/user.entity';
import {EntityManager, Repository} from 'typeorm';
import {FacebookCredentials} from '../dto/facebook-credentials.dto';
import {ClientUser} from '../../entity/models/client-user.entity';
import {SecurityBaseService} from './security-base.service';
import {JwtService} from '@nestjs/jwt';
import {FacebookUser} from '../../entity/models/facebook-user.entity';

@Injectable()
export class FacebookService extends SecurityBaseService
{
    static API_BASE_URL = 'https://graph.facebook.com';

    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
        @InjectRepository(User)
        private readonly userRepository: Repository<ClientUser>,
        private readonly httpService: HttpService,
        protected jwtService: JwtService
    ) {
        super(jwtService);
    }

    async updateUser(data: FacebookCredentials): Promise<ClientUser>
    {
        let response = null;
        try {
            response = await this
                .httpService
                .get(this.getUserInfoUrl(data))
                .toPromise();
        }
        catch (e) {
            throw new BadRequestException('Token is not valid!');
        }

        const { id, name, picture } = response.data;

        // find the user with id facebookUserId = data.userID in the database
        let user: ClientUser = await this.userRepository.findOne({
            facebook: {
                userId: id
            }
        });

        if (!user)
        {
            user = new ClientUser();
            this.updateUserCredentials(user, data);
        }
        else
        {
            if (user.facebook.userId !== data.userID)
            {
                throw new BadRequestException('The token is invalid!');
            }

            // update the info
            this.updateUserCredentials(user, data)
        }

        user.isActive = true;
        user.fullName = name;
        user.facebook.picture = picture;

        // @ts-ignore
        await this.userRepository.save(user);

        return user;
    }

    private updateUserCredentials(user: ClientUser, data: FacebookCredentials)
    {
        if (!user.facebook)
        {
            user.facebook = new FacebookUser();
        }

        user.facebook = Object.assign(user.facebook, {
            userId: data.userID,
            accessToken: data.accessToken,
            accessTokenSource: data.accessTokenSource,
            applicationID: data.applicationID,
            dataAccessExpirationTime: new Date(data.dataAccessExpirationTime),
            declinedPermissions: data.declinedPermissions,
            expirationTime: new Date(data.expirationTime),
            expiredPermissions: data.expiredPermissions,
            lastRefreshTime: new Date(data.lastRefreshTime),
            permissions: data.permissions
        });
    }

    private getUserInfoUrl(data: FacebookCredentials): string
    {
        return  FacebookService.API_BASE_URL + '/' + data.userID
            + '?fields=id,name,picture.width(720).height(720)&&access_token=' + data.accessToken;
    }
}