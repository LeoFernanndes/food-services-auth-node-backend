import {BaseInputDTO} from "../BaseInputDTO";
import {UserDataClass} from "./UserDataClass";
import {validateSync, ValidationError} from "class-validator";
import {DataClass} from "../DataClass";
import {NotFoundException} from "../../common/exceptions/NotFoundException";
import bcrypt from "bcrypt";
import {LoginDataClass} from "./LoginDataClass";


export class LoginInputDTO extends BaseInputDTO {
    readonly _allowedFieldNames = ['username', 'password'];
    readonly initialData: LoginDataClass;
    readonly validatedData: LoginDataClass;
    readonly validationErrors: ValidationError[]

    constructor(object: LoginDataClass) {
        super()
        // super(object);
        this.initialData = object
        this.validationErrors = this.validateDataClass(object)
        this.validatedData = this.parseValidatedDataClass(object)
    }

    // TODO: find a way of generating errors only once
    validateDataClass(loginDataClass: LoginDataClass): ValidationError[] {
        const dataClassToBeValidated = this.plainToDataClass(loginDataClass)
        return validateSync(dataClassToBeValidated)
    }

    parseValidatedDataClass(loginDataClass: LoginDataClass): LoginDataClass {
        const validationErrors = this.validateDataClass(loginDataClass)
        if (validationErrors.length > 0){
            throw validationErrors
        } else {
            return this.plainToDataClass(loginDataClass)
        }
    }

    plainToDataClass(loginDataClass: LoginDataClass): LoginDataClass {
        const dataClassToBeReturned = new LoginDataClass();
        for (let property in loginDataClass){
            if (property != 'constructor'){
                dataClassToBeReturned[property] = loginDataClass[property]
            }
        }
        return dataClassToBeReturned
    }
}