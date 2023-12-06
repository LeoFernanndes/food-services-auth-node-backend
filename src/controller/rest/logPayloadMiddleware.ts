import {DataClass} from "../../dto/DataClass";
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

// TODO: arrange data validation to be done in a single place
export function testRouterMiddleware(dataClass: DataClass, skipMissingProperties = false): RequestHandler {
    return (req, res, next) => {
        for(let property in req.body){
            dataClass[property] = req.body[property]
        }
        const errors = validateSync(dataClass)
        if (errors.length > 0){
            next(res.status(400).json(errors))
        } else {
            // TODO: add validated data to body passed to next
            next();
        }
}}

