import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {Exclude, Expose, plainToClass} from 'class-transformer';
import {Base} from './base.entity';

@Exclude()
@Entity()
export class Language extends Base
{
    @Expose()
    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({ type: 'varchar', length: 2 })
    code: string;

    @Expose()
    @Column({ type: 'varchar', length: 255 })
    title: string;

    serialize(groups: Array<string> = []): Object {
        return {
            ...super.serialize(groups),
            ...plainToClass(Language, this, { groups })
        };
    }
}
