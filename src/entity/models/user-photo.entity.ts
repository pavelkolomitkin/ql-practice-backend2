import {Column} from 'typeorm';

export class UserPhoto
{
    static createFromUploadedFile(file: any): UserPhoto
    {
        const result: UserPhoto = new UserPhoto();

        result.filename = file.filename;
        result.encoding = file.encoding;
        result.mimetype = file.mimetype;
        result.originalname = file.originalname;
        result.size = file.size;

        return result;
    }

    @Column({ type: 'varchar', length: 50, nullable: true })
    encoding: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    mimetype: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    originalname: string;

    @Column({ type: 'int', nullable: true })
    size: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    filename: string;

    thumbs: Object = {};
}