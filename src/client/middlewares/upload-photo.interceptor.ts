import {FileInterceptor} from '@nestjs/platform-express';

const imageMimeTypes: Array<string> = [
    'image/gif',
    'image/jpeg',
    'image/pjpeg',
    'image/png',
    'image/svg',
    'image/tiff',
    'image/vnd',
    'image/vnd',
    'image/webp',
];

const isFileImage = (file: any) => {

    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return false;
    }

    if (!imageMimeTypes.includes(file.mimetype))
    {
        return false;
    }

    return true;
};

const interceptor = ({ fieldName }: { fieldName: string }) => {

    return FileInterceptor( fieldName, {
            dest: process.env.UPLOAD_PHOTO_DIRECTORY,
            limits: {
                fileSize: parseInt(process.env.MAX_UPLOAD_FILE_SIZE),
            },
            fileFilter(req: any, file: { fieldname: string; originalname: string; encoding: string; mimetype: string; size: number; destination: string; filename: string; path: string; buffer: Buffer }, callback: (error: (Error | null), acceptFile: boolean) => void): void {

                if (!isFileImage(file))
                {
                    return callback(new Error('Only image files are allowed!'), false);
                }

                callback(null, true);
            }
        }
        );

};

export default interceptor;