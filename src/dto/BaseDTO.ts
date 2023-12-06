import {DataClass} from "./DataClass";

export abstract class BaseDTO {
    abstract _dtoType: 'input' | 'output';
    abstract _allowedFieldNames: string[];
    abstract initialData: DataClass;
    readonly abstract validatedData: DataClass;

    abstract parseValidatedDataClass(object: DataClass): DataClass;
}