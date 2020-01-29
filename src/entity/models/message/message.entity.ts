import {Base} from '../base.entity';
import {Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, TableInheritance, UpdateDateColumn} from 'typeorm';
import {Expose, plainToClass} from 'class-transformer';
import {User} from '../user.entity';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Message extends Base
{
    @Expose()
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, { eager: true })
    user: User;

    @Expose()
    @CreateDateColumn({ type: 'timestamp without time zone' })
    createdAt: Date;

    @Expose()
    @UpdateDateColumn({ type: 'timestamp without time zone' })
    updatedAt: Date;

    @Expose()
    @Column({ type: 'bool', default: false })
    isRemoved: boolean;

    serialize(groups: Array<string> = []): Object {

        const serializedContent = this.isRemoved ? {} : this.getSerializedContent(groups);

        return {
            ...super.serialize(groups),
            ...plainToClass(Message, this, { groups }),
            user: this.user.serialize(groups),
            ...serializedContent
        };
    }

    protected getSerializedContent(groups?: string[])
    {
        return {};
    }
}