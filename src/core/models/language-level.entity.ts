import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class LanguageLevel
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'varchar', length: 30})
    code: string;
}
