import {BaseDataClass} from "./BaseDataClass";
import {BaseDTO} from "./BaseDTO";


export abstract class BaseOrmDTO<DataClass extends BaseDataClass, Entity> extends BaseDTO<DataClass> {
    public readonly entity;

    protected constructor(dataClass: DataClass, dataclassType: {new():DataClass}, entityType: {new():Entity}, allowedFieldNames: string[]) {
        super(dataClass, dataclassType, allowedFieldNames);
        this.entity = this.generateEntity(entityType)
    }

    public generateEntity<Entity>(type: {new(): Entity}): Entity {
        const entity = new type();
        this._allowedFieldNames.forEach(field => {
            entity[field] = this.validatedData[field]
        })
        return entity
    }
}