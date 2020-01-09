import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Language
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 2 })
    code: string;

    @Column({ type: 'varchar', length: 255 })
    title: string;
}
