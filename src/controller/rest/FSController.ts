import {FSControllerResponse} from "./FSControllerResponse";
import {FSControllerRequest} from "./FSControllerRequest";
import {DataSource} from "typeorm";
import {AppDataSource} from "../../DataSource";
import {BaseDTO} from "../../dto/BaseDTO";
import {BaseDataClass} from "../../dto/BaseDataClass";


export abstract class FSController {
    request: FSControllerRequest;
    response: FSControllerResponse;
    appDataSource: DataSource;
    messageDispatcher: any;

    protected constructor(request: FSControllerRequest, options?: ControllerOptions) {
        this.request = request;
        this.response = new FSControllerResponse();
        this.appDataSource = options?.appDataSource? options.appDataSource: AppDataSource;
        this.messageDispatcher = options?.messageDispatcher;
    }

    protected dtoIsValid(dto: BaseDTO<BaseDataClass>): boolean {
        if(dto.validationErrors.length > 0){
            this.response.status = 400;
            this.response.data = dto.validationErrors;
            return false
        } else {
            return true
        }
    }
}

export interface ControllerOptions {
    appDataSource?: DataSource,
    messageDispatcher?: any
}