import express from "express";
import {decodeTokenMiddleware} from "../controller/rest/middlewares/decodeTokenMiddleware";
import {FSControllerRequest} from "../controller/rest/FSControllerRequest";
import {rabbitMQProducer} from "../index";
import {AddressController} from "../controller/rest/address/AddressController";

export const router = express.Router();
router.use(decodeTokenMiddleware)

router.post('/', async (req,res) => {
    const request = new FSControllerRequest(req.body, req.headers, req.params, req.query);
    const addressController = new AddressController(request, {messageDispatcher: rabbitMQProducer});
    const response = await addressController.createAddress();
    res.status(response.status).json(response.data);
})