import {BaseDataClass} from "./BaseDataClass";
import {BaseDTO, BaseDtoOptionalParametersInterface} from "./BaseDTO";
import {v4 as uuidV4} from "uuid";
import {FSBaseEntity} from "../entity/FSBaseEntity";


export interface BaseOrmDtoOptionalParametersInterface extends BaseDtoOptionalParametersInterface {
    entityGenerationOptions?: {
        idFieldName: string,
        idValuePrefix: string
    }
}

export abstract class BaseOrmDTO<DataClass extends BaseDataClass, Entity extends FSBaseEntity> extends BaseDTO<DataClass> {
    public readonly entity;
    protected readonly rawEntity: Entity
    protected readonly entityConstructor: {new():Entity};

    protected constructor(dataClass: DataClass, dataclassType: {new():DataClass}, entityType: {new():Entity},
                          allowedFieldNames: string[], options?: BaseOrmDtoOptionalParametersInterface) {
        super(dataClass, dataclassType, allowedFieldNames, options);
        this.entity = this.generateEntity(entityType, options?.entityGenerationOptions);
    }

    protected generateEntity<Entity>(type: {new(): Entity}, entityGenerationOptions?): Entity {
        if (this.validatedDataClassFieldNames.length == 0){
            return
        }
        const entity = this.generateEntityWithoutId(type);
        if (!entityGenerationOptions) {
            return entity
        } else {
            const idBaseUuid = uuidV4().toString();
            const id = `${entityGenerationOptions.idValuePrefix}_${idBaseUuid}`;
            entity[entityGenerationOptions.idFieldName] = id;
            return entity
        }
    }

    protected generateEntityWithoutId<Entity>(type: {new(): Entity}): Entity {
        const entity = new type();
        this.validatedDataClassFieldNames.forEach(field => {
            entity[field] = this.validatedData[field]
        })
        return entity
    }

    public getPlainObjectEntity() {
        let plainObjectEntity = {};
        this.validatedDataClassFieldNames.forEach(field => {
            plainObjectEntity[field] = this.validatedData[field]
        })
        return plainObjectEntity
    }
}