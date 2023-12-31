import {BaseDataClass} from "../BaseDataClass";
import {FSBaseEntity} from "../../entity/FSBaseEntity";
import {BaseOrmDTO} from "../BaseOrmDTO";

export class AddressOrmDTO<DataClass extends BaseDataClass, Entity extends FSBaseEntity> extends BaseOrmDTO<DataClass, Entity> {
    constructor(dataClass: DataClass, dataclassType: {new():DataClass}, entityType: {new():Entity}, allowedFieldNames?: string[]) {
        super(dataClass, dataclassType, entityType,
            allowedFieldNames?allowedFieldNames:['id', 'addressType', 'address', 'number', 'numberComplement', 'addressComplement', 'housingType', 'zipCode', 'city', 'state', 'country'],
            {entityGenerationOptions:{idFieldName: 'id', idValuePrefix: 'address'}}
        );
    }
}