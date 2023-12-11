import {NextFunction, Response} from "express";
import jsonwebtoken from "jsonwebtoken";
import {config} from "dotenv";
import {FSExpressRequest} from "../FSExpressRequest";


config();

export function decodeTokenMiddleware(req: FSExpressRequest, res: Response, next: NextFunction){
    const token = req.headers.authorization
    if(token){
        try {
            const parsedToken = token.split('Bearer ')
            req.authData = jsonwebtoken.verify(parsedToken[1], process.env.JWT_SECRET)
            next();
            } catch (error){
            next()
        }
    } else {
        next();
    }
}
