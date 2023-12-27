
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
    const request = new FSControllerRequest(req.body, req.headers, req.params, req.query);
    const userController = new UserController(request, {messageDispatcher: rabbitMQProducer});
    const response = await userController.createUser();
    res.status(response.status).json(response.data);
})

router.get('/', async (req, res) => {
    const request = new FSControllerRequest(req.body, req.headers, req.params, req.query);
    const userController = new UserController(request, {messageDispatcher: rabbitMQProducer});
    const response = await userController.listUsers();
    res.status(response.status).json(response.data);
});

router.get('/:id', async (req, res) => {
    const request = new FSControllerRequest(req.body, req.headers, req.params, req.query);
    const userController = new UserController(request, {messageDispatcher: rabbitMQProducer});
    const response = await userController.getUserById();
    res.status(response.status).json(response.data);
});

router.put('/:id', async (req, res) => {
    const request = new FSControllerRequest(req.body, req.headers, req.params, req.query);
    const userController = new UserController(request, {messageDispatcher: rabbitMQProducer});
    const response = await userController.updateUserByID();
    res.status(response.status).json(response.data);
});

router.delete('/:id', async (req, res) => {
    const request = new FSControllerRequest(req.body, req.headers, req.params, req.query);
    const userController = new UserController(request, {messageDispatcher: rabbitMQProducer});
    const response = await userController.deleteUserById();
    res.status(response.status).json(response.data);
});

router.post('/login', validatePayloadMiddleware(new LoginDataClass()), async (req, res) => {
    const request = new FSControllerRequest(req.body, req.headers, req.params, req.query);
    const authenticationController = new AuthenticationController(request, {messageDispatcher: rabbitMQProducer});
    const response = await authenticationController.login();
    res.status(response.status).json(response.data);
});

router.post('/validate-token', validatePayloadMiddleware(new TokenDataClass()), async (req, res) => {
    const request = new FSControllerRequest(req.body, req.headers, req.params, req.query);
    const authenticationController = new AuthenticationController(request, {messageDispatcher: rabbitMQProducer});
    const response = await authenticationController.validateToken();
    res.status(response.status).json(response.data);
});