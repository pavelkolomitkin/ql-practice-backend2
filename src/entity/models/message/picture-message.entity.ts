import {Message} from './message.entity';
import {Exclude} from 'class-transformer';
import {ChildEntity, Column} from 'typeorm';
import {Photo} from '../photo.entity';

@Exclude()
@ChildEntity()
export class PictureMessage extends Message
{
    @Column( type => Photo, { prefix: 'picture' } )
    picture: Photo;

    protected getSerializedContent(groups?: string[]): {} {
        return {
            ...super.getSerializedContent(groups),
            ...this.picture
        };
    }
}