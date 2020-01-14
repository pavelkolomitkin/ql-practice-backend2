import {Column} from "typeorm";


export class FacebookUser
{
    @Column({ type: 'varchar', length: 255, nullable: true })
    accessToken: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    accessTokenSource: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    applicationID: string;

    @Column({ type: 'timestamp without time zone', nullable: true })
    dataAccessExpirationTime: Date;

    @Column({ type: 'simple-array', nullable: true })
    declinedPermissions: Array<string>;

    @Column({ type: 'timestamp without time zone', nullable: true })
    expirationTime: Date;

    @Column({ type: 'simple-array', nullable: true })
    expiredPermissions: Array<string>;

    @Column({ type: 'timestamp without time zone', nullable: true })
    lastRefreshTime: Date;

    @Column({ type: 'simple-array', nullable: true })
    permissions: Array<string>;

    @Column({ type: 'varchar', length: 50, nullable: true, unique: true })
    userId: string;

    @Column({ type: 'json', nullable: true })
    picture: any;
}