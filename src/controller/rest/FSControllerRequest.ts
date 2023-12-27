export class FSControllerRequest {
    body: any;
    headers: any;
    params: any;
    query: any;

    constructor(body: any, headers: any, params: any, query: any) {
        this.body = body;
        this.headers = headers;
        this.params = params;
        this.query = query;
    }
}