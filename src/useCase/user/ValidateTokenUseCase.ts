import {UserTypeOrmRepository} from "../../repository/typeOrm/user/UserTypeOrmRepository";
import {BaseUseCaseInterface} from "../BaseUseCaseInterface";
import {BadRequestException} from "../../common/exceptions/BadRequestException";
import {config} from "dotenv"
import {TokenEnconder} from "../../common/token/TokenEnconder";
import {TokenExpiredError} from "jsonwebtoken";
import {ValidationError} from "class-validator";
import {UserDTO} from "../../dto/user/UserDTO";
import {TokenDTO} from "../../dto/user/TokenDTO";


config();


export class ValidateTokenUseCase implements BaseUseCaseInterface{
    private readonly repository: UserTypeOrmRepository;
    constructor(repository: UserTypeOrmRepository) {
        this.repository = repository;
    }

    async execute(tokenInputDTO: TokenDTO): Promise<UserDTO> {
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