import {Expose} from 'class-transformer';
import {CreateDateColumn, UpdateDateColumn} from 'typeorm';

export class Timestampable
{
    @Expose()
    @CreateDateColumn({ type: 'timestamp without time zone' })
    createdAt: Date;

    @Expose()
    @UpdateDateColumn({ type: 'timestamp without time zone' })
    updatedAt: Date;
}