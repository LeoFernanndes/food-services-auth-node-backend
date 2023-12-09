import {Request} from "express";

export interface FSExpressRequest extends Request {
    authData: object
}