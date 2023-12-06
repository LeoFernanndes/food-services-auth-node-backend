import {BaseOutputDTO} from "../BaseOutputDTO";
import {UserDataClass} from "./UserDataClass";
import {DataClass} from "../DataClass";
import {ValidationError} from "class-validator";


export class UserOutputDTO extends BaseOutputDTO {
    _allowedFieldNames = ['id', 'firstName', 'lastName', 'age'];
    initialData: UserDataClass;
    readonly validatedData: UserDataClass;

    id: number | string;
    firstName: string;
    lastName: string;
    age: number;

    constructor(object: UserDataClass) {
        super(object);
    }

    validateObject(object: UserDataClass): UserDataClass {
        return {
            id: object.id,
            firstName: object.firstName,
            lastName: object.lastName,
            age: object.age
        }
    }

    parseValidatedDataClass(object: DataClass): DataClass {
        return undefined;
    }

    validateData(data: DataClass): ValidationError[] {
        return [];
    }
}