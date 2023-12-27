import {BaseDataClass} from "./BaseDataClass";
import {validateSync, ValidationError} from "class-validator";


export abstract class BaseDTO<DataClass extends BaseDataClass> {
    public _allowedFieldNames: string[];
    public initialData: DataClass;
    public validatedData: DataClass;

    protected constructor(dataClass: DataClass, type: {new():DataClass}, allowedFieldNames: string[]) {
        this._allowedFieldNames = allowedFieldNames;
        const newObject = this.deepCopyDataClass(dataClass, this._allowedFieldNames, type);
        this.initialData = newObject;
        const validatedObject = this.parseValidatedDataClass(newObject, type);
        this.validatedData = this.parseValidatedDataClass(validatedObject, type);
    }

    protected deepCopyDataClass<DataClass>(dataClass: DataClass, fields: string[], type: {new(): DataClass}): DataClass {
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

    protected validateDataClass<DataClass extends object>(dataClass: DataClass, type: {new(): DataClass}): ValidationError[] {
        const dataClassToBeValidated = this.plainToDataClass(dataClass, type)
        return validateSync(dataClassToBeValidated)
    }

    protected plainToDataClass<DataClass>(dataClass: BaseDataClass, type: {new(): DataClass}): DataClass {
        const userDataClassToBeReturned = new type();
        for (let property in dataClass){
            if (property != 'constructor'){
                userDataClassToBeReturned[property] = dataClass[property]
            }
        }
        return userDataClassToBeReturned
    }

    protected parseValidatedDataClass<DataClass extends BaseDataClass>(dataClass: DataClass, type: {new(): DataClass}): DataClass {
        const newDataClass = this.deepCopyDataClass<DataClass>(dataClass, this._allowedFieldNames, type)
        const validationErrors = this.validateDataClass<DataClass>(newDataClass, type)
        if (validationErrors.length > 0){
            throw validationErrors
        } else {
            return this.plainToDataClass(newDataClass, type)
        }
    }
}