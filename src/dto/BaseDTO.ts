import {BaseDataClass} from "./BaseDataClass";
import {validateSync, ValidationError} from "class-validator";


export abstract class BaseDTO {
    readonly _allowedFieldNames: string[];
    public  initialData: BaseDataClass;
    public  validatedData: BaseDataClass;

    protected deepCopyDataClass<T>(dataClass: T, fields: string[], type: {new(): T}): T {
        const returnedDataClass = new type();
        fields.forEach(property => {
            returnedDataClass[property] = dataClass[property]
        });
        return returnedDataClass;
    }

    protected validateFieldNames(allowedFieldNames: string[], constructorFieldNames: string[]){
        const validFieldNames: string[] = [];
        const invalidFieldNames: string[] = [];
        constructorFieldNames.forEach(field =>{
            if (allowedFieldNames.includes(field)) {
                validFieldNames.push(field);
            } else {
                invalidFieldNames.push(field)
            }
            if (invalidFieldNames.length > 0) {
                throw Error(`Dto field names validation failed: ${invalidFieldNames}}`);
            }
        })
        return validFieldNames;
    }

    protected validateDataClass<T extends object>(dataClass: T, type: {new(): T}): ValidationError[] {
        const dataClassToBeValidated = this.plainToDataClass(dataClass, type)
        return validateSync(dataClassToBeValidated)
    }

    protected plainToDataClass<T>(dataClass: BaseDataClass, type: {new(): T}): T {
        const userDataClassToBeReturned = new type();
        for (let property in dataClass){
            if (property != 'constructor'){
                userDataClassToBeReturned[property] = dataClass[property]
            }
        }
        return userDataClassToBeReturned
    }

    protected parseValidatedDataClass<T extends BaseDataClass>(dataClass: T, type: {new(): T}): T {
        const newDataClass = this.deepCopyDataClass<T>(dataClass, this._allowedFieldNames, type)
        const validationErrors = this.validateDataClass<T>(newDataClass, type)
        if (validationErrors.length > 0){
            throw validationErrors
        } else {
            return this.plainToDataClass(newDataClass, type)
        }
    }
}