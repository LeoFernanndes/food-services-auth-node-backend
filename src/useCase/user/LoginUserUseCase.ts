import {UserTypeOrmRepository} from "../../repository/typeOrm/user/UserTypeOrmRepository";
import {BaseUseCaseInterface} from "../BaseUseCaseInterface";
import bcrypt from "bcrypt";
import {BadRequestException} from "../../common/exceptions/BadRequestException";
import {config} from "dotenv"
import {TokenEnconder} from "../../common/token/TokenEnconder";
import {TokenDTO} from "../../dto/user/TokenDTO";
import {TokenDataClass} from "../../dto/user/dataClass/TokenDataClass";
import {LoginDTO} from "../../dto/user/LoginDTO";
import {LoginDataClass} from "../../dto/user/dataClass/LoginDataClass";


config();


export class LoginUserUseCase implements BaseUseCaseInterface{
    private readonly repository: UserTypeOrmRepository;
    constructor(repository: UserTypeOrmRepository) {
        this.repository = repository;
    }

    async execute(loginDTO: LoginDTO<LoginDataClass>): Promise<TokenDTO<TokenDataClass>> {
        const userDTO = await this.repository.getByUsername(loginDTO.validatedData.userName)
        if (!bcrypt.compareSync(loginDTO.validatedData.password, userDTO.validatedData.password)){
            throw new BadRequestException('Invalid user password');
        }

        const tokenDataClass = TokenEnconder.encode(userDTO, 3600).validatedData;
        return new TokenDTO<TokenDataClass>(tokenDataClass, TokenDataClass);
    }
}