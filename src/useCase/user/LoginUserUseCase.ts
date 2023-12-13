import {UserTypeOrmRepository} from "../../repository/typeOrm/user/UserTypeOrmRepository";
import {BaseUseCaseInterface} from "../BaseUseCaseInterface";
import {LoginInputDTO} from "../../dto/user/LoginInputDTO";
import bcrypt from "bcrypt";
import {BadRequestException} from "../../common/exceptions/BadRequestException";
import {LoginOutputDTO} from "../../dto/user/LoginOutputDTO";
import {config} from "dotenv"
import {TokenEnconder} from "../../common/token/TokenEnconder";


config();


export class LoginUserUseCase implements BaseUseCaseInterface{
    private readonly repository: UserTypeOrmRepository;
    constructor(repository: UserTypeOrmRepository) {
        this.repository = repository;
    }

    async execute(loginDTO: LoginInputDTO): Promise<LoginOutputDTO> {
        const userOutputDTO = await this.repository.getByUsername(loginDTO.validatedData.userName)
        if (!bcrypt.compareSync(loginDTO.validatedData.password, userOutputDTO.initialData.password)){
            throw new BadRequestException('Invalid user password');
        }
        const tokenDataClass = TokenEnconder.encode(userOutputDTO, 3600).validatedData
        return new LoginOutputDTO(tokenDataClass)
    }
}