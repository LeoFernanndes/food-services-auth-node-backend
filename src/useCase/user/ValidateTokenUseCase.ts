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
import {User} from "../../entity/User";
import {BaseUseCase} from "../BaseUseCase";


config();


export class ValidateTokenUseCase extends BaseUseCase implements BaseUseCaseInterface{
    constructor(repository: UserTypeOrmRepository, messageDispatcher?) {
        super(repository, messageDispatcher)
    }

    async execute(tokenInputDTO: TokenDTO<TokenDataClass>): Promise<UserOrmDTO<UserDataClass, User>> {
        try {
            return TokenEnconder.decode(tokenInputDTO)
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