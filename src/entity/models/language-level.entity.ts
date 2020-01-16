import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {Exclude, Expose, plainToClass} from 'class-transformer';
import {Base} from './base.entity';

@Exclude()
@Entity()
export class LanguageLevel extends Base
{
    static NATIVE_CODE = 'native';

    @Expose()
    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Expose()
    @Column({ type: 'varchar', length: 30})
    code: string;

    @Expose()
    @Column({ type: 'smallint', unsigned: true })
    level: number;

    serialize(groups: Array<string> = []): Object {
        return {
            ...super.serialize(groups),
            ...plainToClass(LanguageLevel, this, { groups })
        };
    }
}
