import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    TableInheritance,
    UpdateDateColumn
} from 'typeorm';

import {Exclude, Expose, plainToClass} from 'class-transformer';
import {Base} from './base.entity';
import {Photo} from './photo.entity';
import {config as thumb} from '../../config/thumb';


@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
@Exclude()
export class User extends Base
{
    @Expose()
    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({ type: 'varchar', name: 'type' })
    type: string;

    @Expose({ groups: ['mine', 'admin'] })
    @Column({ type: 'varchar', length: 255, unique: true, nullable: true})
    email: string;

    @Column({ type: 'char', length: 60, nullable: true})
    password: string;

    @Expose()
    @Column({ type: 'bool', default: false })
    isActive: boolean;

    @Expose()
    @Column({ type: 'bool', default: false })
    isBlocked: boolean;

    @Expose()
    @Column({ type: 'varchar', length: 250,  nullable: false })
    fullName: string;

    @Expose()
    @Column( type => Photo, { prefix: 'photo' } )
    photo: Photo;

    @Expose()
    @Column({ type: 'timestamp without time zone', nullable: true })
    lastActivity: Date;

    @Expose({ groups: ['admin'] })
    @CreateDateColumn({ type: 'timestamp without time zone' })
    createdAt: Date;

    @Expose({ groups: ['admin'] })
    @UpdateDateColumn({ type: 'timestamp without time zone' })
    updatedAt: Date;

    hasPhoto(): boolean
    {
        return !!this.photo && !!this.photo.filename;
    }

    removePhoto()
    {
        if (this.hasPhoto())
        {
            this.photo.filename = null;
            this.photo.mimetype = null;
            this.photo.encoding = null;
            this.photo.originalname = null;
            this.photo.size = null;
            this.photo.thumbs = {};
        }
    }

    prepareThumbs()
    {
        const baseUrl: string = process.env.SERVER_ADDRESS + '/api';

        Object.keys(thumb.photo).forEach(size => {
            this.photo.thumbs[size] = baseUrl + '/user/photo/' + this.id + '/' + this.photo.filename + '/' + size;
        });
    }

    serialize(groups: Array<string> = []): Object {

        if (this.hasPhoto())
        {
            this.prepareThumbs();
        }

        return {
            ...super.serialize(groups),
            ...plainToClass(User, this, { groups })
        };
    }
}
