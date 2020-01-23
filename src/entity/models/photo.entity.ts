import {Column} from 'typeorm';

export class Photo
{
    static createFromUploadedFile(file: any): Photo
    {
        const result: Photo = new Photo();

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