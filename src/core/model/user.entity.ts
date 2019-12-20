import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, TableInheritance, Timestamp, UpdateDateColumn} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class User
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, unique: true, nullable: true})
    email: string;

    @Column({ type: 'char', length: 60, nullable: true})
    password: string;

    @Column({ type: 'bool', default: false })
    isActive: boolean;

    @Column({ type: 'varchar', length: 250,  nullable: false })
    fullName: string;

    @Column({ type: 'timestamp without time zone', nullable: true })
    lastActivity: Date;

    @CreateDateColumn({ type: 'timestamp without time zone' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp without time zone' })
    updatedAt: Date;
}
