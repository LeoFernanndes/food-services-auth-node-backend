import {DataClass} from "../../../dto/DataClass";
import {NextFunction, Request, RequestHandler, Response} from "express";
import {validateSync} from "class-validator";


// TODO: arrange data validation to be done in a single place
export function validatePayloadMiddleware(dataClass: DataClass, skipMissingProperties = false): RequestHandler {
    return (req, res, next) => {
        if (req.method in  ['POST', 'PUT']){
            next();
        }

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

