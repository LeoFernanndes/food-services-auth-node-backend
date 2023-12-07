import {BaseOutputDTO} from "../BaseOutputDTO";
import {UserDataClass} from "./UserDataClass";
import {DataClass} from "../DataClass";
import {ValidationError} from "class-validator";


export class UserOutputDTO extends BaseOutputDTO {
    _allowedFieldNames = ['id', 'firstName', 'lastName', 'age'];
    initialData: UserDataClass;
    readonly validatedData: UserDataClass;

    constructor(object: UserDataClass) {
        super(object);
    }

    validateObject(object: UserDataClass): UserDataClass {
        return {
            id: object.id,
            firstName: object.firstName,
            lastName: object.lastName,
            age: object.age,
            userName: object.userName,
            password: object.password
        }
    }

    parseValidatedDataClass(object: DataClass): DataClass {
        return undefined;
    }

    validateData(data: DataClass): ValidationError[] {
        return [];
    }
}