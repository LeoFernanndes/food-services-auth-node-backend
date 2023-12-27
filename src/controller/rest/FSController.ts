import {FSControllerResponse} from "./FSControllerResponse";
import {FSControllerRequest} from "./FSControllerRequest";
import {DataSource} from "typeorm";
import {AppDataSource} from "../../DataSource";


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
}

export interface ControllerOptions {
    appDataSource?: DataSource,
    messageDispatcher?: any
}