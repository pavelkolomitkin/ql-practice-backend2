import {Base} from '../base.entity';
import {CreateDateColumn, Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn, TableInheritance, UpdateDateColumn} from 'typeorm';
import {Expose} from 'class-transformer';
import {User} from '../user.entity';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Message extends Base
{
    @Expose()
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(type => User, { eager: true })
    user: User;

    @Expose()
    @CreateDateColumn({ type: 'timestamp without time zone' })
    createdAt: Date;

    @Expose()
    @UpdateDateColumn({ type: 'timestamp without time zone' })
    updatedAt: Date;
}