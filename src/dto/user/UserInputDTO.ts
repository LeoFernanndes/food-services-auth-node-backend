import {BaseInputDTO} from "../BaseInputDTO";
import {UserDataClass} from "./UserDataClass";
import {validateSync, ValidationError} from "class-validator";
import {DataClass} from "../DataClass";
import {NotFoundException} from "../../common/exceptions/NotFound";


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
    }

    // TODO: find a way of generating errors only once
    validateDataClass(userDataClass: UserDataClass): ValidationError[] {
        const dataClassToBeValidated = this.plainToDataClass(userDataClass)
        return validateSync(dataClassToBeValidated)
    }

    parseValidatedDataClass(userDataClass: UserDataClass): UserDataClass {
        const validationErrors = this.validateDataClass(userDataClass)
        if (validationErrors.length > 0){
            throw validationErrors
        } else {
            return this.plainToDataClass(userDataClass)
        }
    }

    validateData(data: DataClass): ValidationError[] {
        return [];
    }

    plainToDataClass(userDataClass: UserDataClass): UserDataClass {
        const userDataClassToBeReturned = new UserDataClass();
        for (let property in userDataClass){
            if (property != 'constructor'){
                userDataClassToBeReturned[property] = userDataClass[property]
            }
        }
        return userDataClassToBeReturned
    }
}