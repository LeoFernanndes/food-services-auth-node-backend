import {BaseOutputDTO} from "../BaseOutputDTO";
import {UserDataClass} from "./UserDataClass";
import {validateSync, ValidationError} from "class-validator";


export class UserOutputDTO extends BaseOutputDTO {
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

    plainToDataClass(userDataClass: UserDataClass): UserDataClass {
        const userDataClassToBeReturned = new UserDataClass();
        for (let property in userDataClass){
            if (property != 'constructor'){
                userDataClassToBeReturned[property] = userDataClass[property]
            }
        }
        return userDataClassToBeReturned
    }

    validateDataClass(userDataClass: UserDataClass): ValidationError[] {
        const dataClassToBeValidated = this.plainToDataClass(userDataClass)
        return validateSync(dataClassToBeValidated)
    }
}