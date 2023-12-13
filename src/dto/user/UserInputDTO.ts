import {BaseInputDTO} from "../BaseInputDTO";
import {UserDataClass} from "./UserDataClass";
import {validateSync, ValidationError} from "class-validator";
import bcrypt from "bcrypt";


export class UserInputDTO extends BaseInputDTO {
    readonly _allowedFieldNames = ['firstName', 'lastName', 'age'];
    readonly initialData: UserDataClass;
    readonly validatedData: UserDataClass;
    readonly validationErrors: ValidationError[]

    constructor(object: UserDataClass) {
        super();
        const newObject = this.deepCopyUserDataClass(object)
        this.initialData = newObject
        this.validationErrors = this.validateDataClass(newObject)
        this.validatedData = this.parseValidatedDataClass(newObject)
    }

    // TODO: find a way of generating errors only once
    validateDataClass(userDataClass: UserDataClass): ValidationError[] {
        const dataClassToBeValidated = this.plainToDataClass(userDataClass)
        return validateSync(dataClassToBeValidated)
    }

    parseValidatedDataClass(userDataClass: UserDataClass): UserDataClass {
        const newUserDataClass = this.deepCopyUserDataClass(userDataClass)
        const validationErrors = this.validateDataClass(newUserDataClass)
        if (validationErrors.length > 0){
            throw validationErrors
        } else {
            newUserDataClass.password = this.hashPassword(newUserDataClass.password)
            return this.plainToDataClass(newUserDataClass)
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

    private hashPassword(password: string): string {
        return bcrypt.hashSync(password, 15)
    }

    private deepCopyUserDataClass(userDataClass: UserDataClass): UserDataClass {
        const returnedUserDataClass = new UserDataClass();
        for (let property in userDataClass ) {
            returnedUserDataClass[property] = userDataClass[property]
        }
        return returnedUserDataClass;
    }
}