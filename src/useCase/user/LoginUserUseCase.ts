import {UserTypeOrmRepository} from "../../repository/typeOrm/user/UserTypeOrmRepository";
import {BaseUseCaseInterface} from "../BaseUseCaseInterface";
import bcrypt from "bcrypt";
import {BadRequestException} from "../../common/exceptions/BadRequestException";
import {config} from "dotenv"
import {TokenEnconder} from "../../common/token/TokenEnconder";
import {TokenDTO} from "../../dto/user/TokenDTO";
import {LoginDTO} from "../../dto/user/LoginDTO";


config();


export class LoginUserUseCase implements BaseUseCaseInterface{
    private readonly repository: UserTypeOrmRepository;
    constructor(repository: UserTypeOrmRepository) {
        this.repository = repository;
    }

    async execute(loginDTO: LoginDTO): Promise<TokenDTO> {
        const userDTO = await this.repository.getByUsername(loginDTO.validatedData.userName)
        if (!bcrypt.compareSync(loginDTO.validatedData.password, userDTO.initialData.password)){
            throw new BadRequestException('Invalid user password');
        }

        const tokenDataClass = TokenEnconder.encode(userDTO, 3600).validatedData
        return new TokenDTO(tokenDataClass)
    }
}