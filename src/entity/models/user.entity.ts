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

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
@Exclude()
export class User extends Base
{
    @Expose()
    @PrimaryGeneratedColumn()
    id: number;

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
    @Column({ type: 'timestamp without time zone', nullable: true })
    lastActivity: Date;

    @Expose({ groups: ['admin'] })
    @CreateDateColumn({ type: 'timestamp without time zone' })
    createdAt: Date;

    @Expose({ groups: ['admin'] })
    @UpdateDateColumn({ type: 'timestamp without time zone' })
    updatedAt: Date;


    serialize(groups: Array<string> = []): Object {
        return {
            ...super.serialize(groups),
            ...plainToClass(User, this, { groups })
        };
    }
}
