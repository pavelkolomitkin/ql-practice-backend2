import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {Exclude, Expose, plainToClass} from 'class-transformer';
import {Base} from './base.entity';

@Exclude()
@Entity()
export class TopicTag extends Base
{
    @Expose()
    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({ type: 'varchar', length: 100, unique: true })
    title: string;

    serialize(groups: Array<string> = []): Object {
        return {
            ...super.serialize(groups),
            ...plainToClass(TopicTag, this, { groups })
        };
    }
}
