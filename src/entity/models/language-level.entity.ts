import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class LanguageLevel
{
    static NATIVE_CODE = 'native';

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'varchar', length: 30})
    code: string;

    @Column({ type: 'smallint', unsigned: true })
    level: number;
}
