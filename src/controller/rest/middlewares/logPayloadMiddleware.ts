import {DataClass} from "../../../dto/DataClass";
import {NextFunction, Request, RequestHandler, Response} from "express";
import {validateSync} from "class-validator";


export function logPayloadMiddleware(req: Request, res: Response, next: NextFunction){
    const upsertMethods = ['POST', 'PUT']
    if (upsertMethods.includes(req.method)) {
        const data = req.body
        console.log(data)
        console.log(req.method)
        next();
    } else {
        next();
    }
}
