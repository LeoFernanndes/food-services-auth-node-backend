import {DataClass} from "./DataClass";
import {validateSync, ValidationError} from "class-validator";
import {BaseDTO} from "./BaseDTO";
import {UserDataClass} from "./user/UserDataClass";

export abstract class BaseOrmDTO extends BaseDTO{
    public readonly abstract entity;

    public generateEntity<T>(type: {new(): T}): T {
        const user = new type();
        this._allowedFieldNames.forEach(field => {
            user[field] = this.validatedData[field]
        })
        return user
    }
}