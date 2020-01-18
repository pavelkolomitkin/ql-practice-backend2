import {ArgumentMetadata, Inject, Injectable, NotFoundException, PipeTransform} from '@nestjs/common';
import {InjectEntityManager, InjectRepository} from '@nestjs/typeorm';
import {EntityManager, ObjectType, Repository} from 'typeorm';
import { Entity } from '../../entity/models/entity.type';

@Injectable()
export class ParameterConverterPipe implements PipeTransform
{

    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,

    ) {
    }

    async transform(value: string, metadata: ArgumentMetadata): Promise<any> {

        const repository: Repository<Entity> = this.entityManager.getRepository(metadata.metatype);
        
        const entity = await repository.findOne({ id: parseInt(value) });
        if (!entity)
        {
            throw new NotFoundException(`'${metadata.metatype.name}' with id = ${value} was not found!`);
        }
        
        return entity;
    }

}
