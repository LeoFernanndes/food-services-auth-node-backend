import {BaseInputDTO} from "../BaseInputDTO";
import {UserDataClass} from "./UserDataClass";
import {validate, validateSync, ValidationError} from "class-validator";
import {DataClass} from "../DataClass";


export class UserInputDTO extends BaseInputDTO {
    readonly _allowedFieldNames = ['firstName', 'lastName', 'age'];
    readonly initialData: UserDataClass;
    readonly validatedData: UserDataClass;
    readonly validationErrors: ValidationError[]

    constructor(object: UserDataClass) {
        super(object);
        this.initialData = object
        this.validationErrors = this.validateDataClass(object)
        this.validatedData = this.parseValidatedDataClass(object)
        this.initialData = object
    }

    // TODO: find a way of generating errors only once
    validateDataClass(userDataClass: UserDataClass): ValidationError[] {
        const dataClassToBeValidated = new UserDataClass();
        dataClassToBeValidated.id = userDataClass.id
        dataClassToBeValidated.firstName = userDataClass.firstName
        dataClassToBeValidated.lastName = userDataClass.lastName
        dataClassToBeValidated.age = userDataClass.age
        return validateSync(dataClassToBeValidated)
    }

    parseValidatedDataClass(object: UserDataClass): UserDataClass {
        const validationErrors = this.validateDataClass(object)
        if (validationErrors.length > 0){
            throw validationErrors
        } else {
            let parsedData = new UserDataClass()
            parsedData.id = object.id
            parsedData.firstName = object.firstName
            parsedData.lastName = object.lastName
            parsedData.age = object.age
            return parsedData
        }
    }

    validateData(data: DataClass): ValidationError[] {
        return [];
    }
}