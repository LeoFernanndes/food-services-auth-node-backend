import {UserTypeOrmRepository} from "../../repository/typeOrm/user/UserTypeOrmRepository";
import {BaseUseCaseInterface} from "../BaseUseCaseInterface";
import {BadRequestException} from "../../common/exceptions/BadRequestException";
import {config} from "dotenv"
import {TokenEnconder} from "../../common/token/TokenEnconder";
import {TokenExpiredError} from "jsonwebtoken";
import {ValidationError} from "class-validator";
import {TokenDTO} from "../../dto/user/TokenDTO";
import {TokenDataClass} from "../../dto/user/dataClass/TokenDataClass";
import {UserOrmDTO} from "../../dto/user/UserOrmDTO";
import {UserDataClass} from "../../dto/user/dataClass/UserDataClass";
import {UserEntity} from "../../entity/UserEntity";
import {BaseUseCase} from "../BaseUseCase";
import {RabbitMqMessage} from "../../infra/amqp/RabbitMqMessage";
import {v4 as uuidV4} from "uuid";


config();


export class ValidateTokenUseCase extends BaseUseCase implements BaseUseCaseInterface{
    protected repository: UserTypeOrmRepository;

    constructor(repository: UserTypeOrmRepository, messageDispatcher?) {
        super(repository, messageDispatcher)
    }

    async execute(tokenInputDTO: TokenDTO<TokenDataClass>): Promise<UserOrmDTO<UserDataClass, UserEntity>> {
        try {
            const tokenOutputDTO =  TokenEnconder.decode(tokenInputDTO)

            const rabbitMQMessage = {
                id: uuidV4().toString(),
                action: 'authValidateToken',
                producer: 'auth',
                data: tokenOutputDTO.validatedData
            }
            this.dispatchMessage(rabbitMQMessage)

            return tokenOutputDTO

        } catch (error){
            if (error instanceof TokenExpiredError){
                throw new BadRequestException('Expired token')
            } else if (error instanceof Array && error[0] instanceof ValidationError) {
                throw new Error('Internal server error')
            } else {
                throw new BadRequestException('Invalid token')
            }
        }
    }
}