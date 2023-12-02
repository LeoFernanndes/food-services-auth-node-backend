export abstract class BaseDTO {
    private abstract _dtoType: 'input' | 'output';
    abstract _allowedFieldNames: string[];
    private abstract initialData: BaseDTO;
    readonly abstract validatedData: BaseDTO;
}