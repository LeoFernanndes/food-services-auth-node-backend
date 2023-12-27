import {FSController} from "../FSController";
import {FSControllerResponse} from "../FSControllerResponse";
import {FSControllerRequest} from "../FSControllerRequest";
import {UserTypeOrmRepository} from "../../../repository/typeOrm/user/UserTypeOrmRepository";
import {LoginUserUseCase} from "../../../useCase/user/LoginUserUseCase";
import {AppDataSource} from "../../../DataSource";
import {LoginDTO} from "../../../dto/user/LoginDTO";
import {LoginDataClass} from "../../../dto/user/dataClass/LoginDataClass";
import { v4 as uuidV4 } from "uuid"
import {rabbitMQProducer} from "../../../index";
import {response} from "express";
import {BadRequestException} from "../../../common/exceptions/BadRequestException";
import {NotFoundException} from "../../../common/exceptions/NotFoundException";
import {validatePayloadMiddleware} from "../middlewares/validatePayloadMiddleware";
import {TokenDataClass} from "../../../dto/user/dataClass/TokenDataClass";
import {TokenDTO} from "../../../dto/user/TokenDTO";
import {ValidateTokenUseCase} from "../../../useCase/user/ValidateTokenUseCase";
import {router} from "../UserExpressController";


export class AuthenticationController extends FSController {
    response: FSControllerResponse;

    constructor(request: FSControllerRequest) {
        super(request);
    }

    async login(): Promise<FSControllerResponse> {
        const payloadLogin = this.request.body;
        const usersRepository= new UserTypeOrmRepository(AppDataSource);
        const loginUserUseCase = new LoginUserUseCase(usersRepository);
        const loginInputDTO = new LoginDTO<LoginDataClass>(payloadLogin, LoginDataClass);
        try {
            const loginOutputDTO = await loginUserUseCase.execute(loginInputDTO);
            const plainObjectResponse = loginOutputDTO.validatedData

            const rabbitMQMessage = {
                id: uuidV4().toString(),
                action: 'authLogin',
                producer: 'auth',
                data: loginOutputDTO.validatedData
            }
            rabbitMQProducer(JSON.stringify(rabbitMQMessage))

            this.response.status = 200;
            this.response.data = plainObjectResponse;
            this.response.headers = [];
        } catch (error) {
            if (error instanceof BadRequestException){
                this.response.status = 400;
                this.response.data = {'detail': error.message};
                this.response.headers = [];
            } else if (error instanceof NotFoundException) {
                this.response.status = 400;
                this.response.data = {'detail': error.message};
                this.response.headers = [];
            } else {
                this.response.status = 500;
                this.response.data = {'detail': 'Internal server error'};
                this.response.headers = [];
            }
        }
        return this.response;
    }

    async validateToken(): Promise<FSControllerResponse> {
        const payloadToken = this.request.body
        const tokenInputDTO = new TokenDTO<TokenDataClass>(payloadToken, TokenDataClass);
        const usersRepository = new UserTypeOrmRepository(AppDataSource);
        const validateTokenUseCase = new ValidateTokenUseCase(usersRepository);
        try {
            const tokenOutputDTO = await validateTokenUseCase.execute(tokenInputDTO);
            const plainObjectResponse = tokenOutputDTO.validatedData

            const rabbitMQMessage = {
                id: uuidV4().toString(),
                action: 'authValidateToken',
                producer: 'auth',
                data: tokenOutputDTO.validatedData
            }
            rabbitMQProducer(JSON.stringify(rabbitMQMessage))
            this.response.status = 200;
            this.response.data = plainObjectResponse;
            this.response.headers = [];
        } catch (error) {
            if (error instanceof BadRequestException){
                this.response.status = 400;
                this.response.data = {'detail': error.message};
                this.response.headers = [];
            } else {
                this.response.status = 500;
                this.response.data = {'detail': 'Internal server error'};
                this.response.headers = [];
            }
        }
        return this.response;
    }
}
