import {BaseInputDTO} from "../BaseInputDTO";
import {UserDataClass} from "./UserDataClass";
import {validateSync, ValidationError} from "class-validator";


export class TokenOutputDTO extends BaseInputDTO {
    _allowedFieldNames = ['id', 'firstName', 'lastName', 'age', 'userName'];
    readonly initialData: UserDataClass;
    readonly validatedData: UserDataClass;
    readonly validationErrors: ValidationError[]

    constructor(object: UserDataClass) {
        super()
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
            const parsedUserDataClass = this.plainToDataClass(userDataClass)
            let filteredParsedUserDataClass = new UserDataClass()
            this._allowedFieldNames.forEach(property => {
                filteredParsedUserDataClass[property] = parsedUserDataClass[property]
            })
            return filteredParsedUserDataClass
        }
    }

    plainToDataClass(tokenDataClass: UserDataClass): UserDataClass {
        const dataClassToBeReturned = new UserDataClass();
        for (let property in tokenDataClass){
            if (property != 'constructor'){
                dataClassToBeReturned[property] = tokenDataClass[property]
            }
        }
        return dataClassToBeReturned
    }
}