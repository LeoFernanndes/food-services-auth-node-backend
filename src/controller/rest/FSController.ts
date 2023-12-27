import {FSControllerResponse} from "./FSControllerResponse";
import {FSControllerRequest} from "./FSControllerRequest";


export abstract class FSController {
    request: FSControllerRequest;
    response: FSControllerResponse;

    protected constructor(request: FSControllerRequest) {
        this.request = request;
        this.response = FSControllerResponse;
    }
}