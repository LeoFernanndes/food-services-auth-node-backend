import {DataClass} from "./DataClass";
import {ValidationError} from "class-validator";

export abstract class BaseDTO {
    abstract _dtoType: 'input' | 'output';
    abstract _allowedFieldNames: string[];
    abstract initialData: DataClass;
    readonly abstract validatedData: DataClass;

    abstract validateDataClass(dataClass: DataClass): ValidationError[];
    abstract parseValidatedDataClass(dataClass: DataClass): DataClass;
    abstract plainToDataClass(dataClass: DataClass): DataClass;
}