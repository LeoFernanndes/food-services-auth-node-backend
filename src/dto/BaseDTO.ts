import {BaseDataClass} from "./BaseDataClass";
import {validateSync, ValidationError} from "class-validator";


export interface BaseDtoOptionalParametersInterface {
    partial?: boolean;
    safe?: boolean;
    dtoEntityFieldNames?: string[];
}


export abstract class BaseDTO<DataClass extends BaseDataClass> {
    public validate: boolean = true;
    protected readonly dtoDataClassFieldNames: string[];
    protected validatedDataClassFieldNames: string[] = [];
    public initialData: DataClass;
    public validatedData: DataClass;
    public validationErrors: ValidationError[] = [];
    public options: BaseDtoOptionalParametersInterface;

    // TODO: Find a way of validating partial updates
    // TODO: Make initial data really represent initial data by changing how it is deep copied
    protected constructor(dataClass: DataClass, type: { new(): DataClass }, dtoDataClassFieldNames: string[], options?: BaseDtoOptionalParametersInterface) {
        this.dtoDataClassFieldNames = dtoDataClassFieldNames;
        this.options = options;
        const receivedDataClassFieldNames = this.getReceivedDataClassFieldNames(dataClass);
        const filteredDataClassFieldNames = this.validateDataClassFieldNames(this.dtoDataClassFieldNames, receivedDataClassFieldNames);
        this.initialData = this.deepCopyDataClass(dataClass, filteredDataClassFieldNames, type);

        this.validatedData = this.parseValidatedDataClass(this.initialData, type);
    }

    protected deepCopyDataClass<DataClass>(dataClass: DataClass, fields: string[], type: { new(): DataClass }): DataClass {
        const returnedDataClass = new type();
        fields.forEach(property => {
            returnedDataClass[property] = dataClass[property]
        });
        return returnedDataClass;
    }

    protected getReceivedDataClassFieldNames(dataClass: BaseDataClass): string[] {
        const receivedDataClassFieldNames: string[] = [];
        for (let dataclassFieldName in dataClass) {
            if (dataclassFieldName != "constructor") {
                receivedDataClassFieldNames.push(dataclassFieldName)
            }
        }
        return receivedDataClassFieldNames
    }

    protected validateDataClassFieldNames(entityFieldNames: string[], dataClassFieldNames: string[]) {
        const validFieldNames: string[] = [];
        dataClassFieldNames.forEach(fieldName => {
            if (entityFieldNames.includes(fieldName)) {
                validFieldNames.push(fieldName)
            }
        })
        return validFieldNames;
    }

    protected validateDataClass<DataClass extends object>(dataClass: DataClass, type: { new(): DataClass }): ValidationError[] {
        const dataClassToBeValidated = this.plainToDataClass(dataClass, type)
        if (this.options?.safe) {
            return [];
        }
        return validateSync(dataClassToBeValidated, {skipMissingProperties: this.options?.partial ? this.options.partial : false})
    }

    protected plainToDataClass<DataClass>(dataClass: BaseDataClass, type: { new(): DataClass }): DataClass {
        const userDataClassToBeReturned = new type();
        for (let property in dataClass) {
            if (property != 'constructor') {
                userDataClassToBeReturned[property] = dataClass[property]
            }
        }
        return userDataClassToBeReturned
    }

    protected parseValidatedDataClass<DataClass extends BaseDataClass>(dataClass: DataClass, type: { new(): DataClass }): DataClass {
        const newDataClass = this.deepCopyDataClass<DataClass>(dataClass, this.dtoDataClassFieldNames, type)
        const validationErrors = this.validateDataClass<DataClass>(newDataClass, type)
        if (validationErrors.length > 0) {
            this.validationErrors = validationErrors
            return
        } else {
            this.validatedDataClassFieldNames = this.getReceivedDataClassFieldNames(newDataClass);
            return this.plainToDataClass(newDataClass, type)
        }
    }
}