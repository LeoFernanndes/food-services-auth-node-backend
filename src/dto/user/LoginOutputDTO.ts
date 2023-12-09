import {BaseInputDTO} from "../BaseInputDTO";
import {UserDataClass} from "./UserDataClass";
import {validateSync, ValidationError} from "class-validator";
import {DataClass} from "../DataClass";
import {NotFoundException} from "../../common/exceptions/NotFoundException";
import bcrypt from "bcrypt";
import {LoginDataClass} from "./LoginDataClass";
import {TokenDataClass} from "./TokenDataClass";


export class LoginOutputDTO extends BaseInputDTO {
    readonly _allowedFieldNames = ['username', 'password'];
    readonly initialData: TokenDataClass;
    readonly validatedData: TokenDataClass;
    readonly validationErrors: ValidationError[]

    constructor(object: TokenDataClass) {
        super()
        this.initialData = object
        this.validationErrors = this.validateDataClass(object)
        this.validatedData = this.parseValidatedDataClass(object)
    }

    // TODO: find a way of generating errors only once
    validateDataClass(tokenDataClass: TokenDataClass): ValidationError[] {
        const dataClassToBeValidated = this.plainToDataClass(tokenDataClass)
        return validateSync(dataClassToBeValidated)
    }

    parseValidatedDataClass(tokenDataClass: TokenDataClass): TokenDataClass {
        const validationErrors = this.validateDataClass(tokenDataClass)
        if (validationErrors.length > 0){
            throw validationErrors
        } else {
            return this.plainToDataClass(tokenDataClass)
        }
    }

    plainToDataClass(tokenDataClass: TokenDataClass): TokenDataClass {
        const dataClassToBeReturned = new TokenDataClass();
        for (let property in tokenDataClass){
            if (property != 'constructor'){
                dataClassToBeReturned[property] = tokenDataClass[property]
            }
        }
        return dataClassToBeReturned
    }
}