import {Base} from '../base.entity';
import {Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, TableInheritance, UpdateDateColumn} from 'typeorm';
import {Expose, plainToClass} from 'class-transformer';
import {User} from '../user.entity';
import {Timestampable} from '../timestampable.entity';

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
    @Column(type => Timestampable, { prefix: 'time' })
    timestamp: Timestampable;

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