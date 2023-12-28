
// TODO: decide where and how to validate data by instantiating new DTO inside routes
// TODO: create a generic validator middleware

import express from "express";
import {decodeTokenMiddleware} from "../controller/rest/middlewares/decodeTokenMiddleware";
import {FSControllerRequest} from "../controller/rest/FSControllerRequest";
import {UserController} from "../controller/rest/user/UserController";
import {validatePayloadMiddleware} from "../controller/rest/middlewares/validatePayloadMiddleware";
import {LoginDataClass} from "../dto/user/dataClass/LoginDataClass";
import {AuthenticationController} from "../controller/rest/user/AuthenticationController";
import {TokenDataClass} from "../dto/user/dataClass/TokenDataClass";
import {rabbitMQProducer} from "../index";


export const router = express.Router();
router.use(decodeTokenMiddleware)

router.post('/', async (req,res) => {
    /* 
        #swagger.description = 'Endpoint to create User' */

    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/UserCreate"
                    }  
                }
            }
        } 
    */

    /* #swagger.responses[201] = {
            description: "Created",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/definitions/User"
                    }
                }           
            }
        }   
    */
    const request = new FSControllerRequest(req.body, req.headers, req.params, req.query);
    const userController = new UserController(request, {messageDispatcher: rabbitMQProducer});
    const response = await userController.createUser();
    res.status(response.status).json(response.data);
})

router.get('/', async (req, res) => {
    /* 
        #swagger.description = 'Endpoint to list Users' */

    /* #swagger.responses[200] = {
            description: "OK",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/definitions/Users"
                    }
                }           
            }
        }   
    */
    const request = new FSControllerRequest(req.body, req.headers, req.params, req.query);
    const userController = new UserController(request, {messageDispatcher: rabbitMQProducer});
    const response = await userController.listUsers();
    res.status(response.status).json(response.data);
});

router.get('/:id', async (req, res) => {
    /* 
        #swagger.description = 'Endpoint to retrive User' */

    /* #swagger.responses[200] = {
            description: "OK",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/definitions/User"
                    }
                }           
            }
        }   
    */
    const request = new FSControllerRequest(req.body, req.headers, req.params, req.query);
    const userController = new UserController(request, {messageDispatcher: rabbitMQProducer});
    const response = await userController.getUserById();
    res.status(response.status).json(response.data);
});

router.put('/:id', async (req, res) => {
    /* 
        #swagger.description = 'Endpoint to update Users' */

            /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/UserUpdate"
                    }  
                }
            }
        } 
    */

    /* #swagger.responses[200] = {
            description: "OK",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/definitions/User"
                    }
                }           
            }
        }   
    */
    const request = new FSControllerRequest(req.body, req.headers, req.params, req.query);
    const userController = new UserController(request, {messageDispatcher: rabbitMQProducer});
    const response = await userController.updateUserByID();
    res.status(response.status).json(response.data);
});

router.delete('/:id', async (req, res) => {
        /* 
        #swagger.description = 'Endpoint to delete Users' */

    /* #swagger.responses[204] = {
            description: "No Content"
        }   
    */
    const request = new FSControllerRequest(req.body, req.headers, req.params, req.query);
    const userController = new UserController(request, {messageDispatcher: rabbitMQProducer});
    const response = await userController.deleteUserById();
    res.status(response.status).json(response.data);
});

router.post('/login', validatePayloadMiddleware(new LoginDataClass()), async (req, res) => {
        /* 
        #swagger.description = 'Endpoint to login User' */

    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/Login"
                    }  
                }
            }
        } 
    */

    /* #swagger.responses[200] = {
            description: "OK",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/definitions/Token"
                    }
                }           
            }
        }   
    */
    const request = new FSControllerRequest(req.body, req.headers, req.params, req.query);
    const authenticationController = new AuthenticationController(request, {messageDispatcher: rabbitMQProducer});
    const response = await authenticationController.login();
    res.status(response.status).json(response.data);
});

router.post('/validate-token', validatePayloadMiddleware(new TokenDataClass()), async (req, res) => {
            /* 
        #swagger.description = 'Endpoint to validate User auth token' */

    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/Token"
                    }  
                }
            }
        } 
    */

    /* #swagger.responses[200] = {
            description: "OK",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/definitions/User"
                    }
                }           
            }
        }   
    */
    const request = new FSControllerRequest(req.body, req.headers, req.params, req.query);
    const authenticationController = new AuthenticationController(request, {messageDispatcher: rabbitMQProducer});
    const response = await authenticationController.validateToken();
    res.status(response.status).json(response.data);
});