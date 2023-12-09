import {UserOutputDTO} from "../../dto/user/UserOutputDTO";
import {UserTypeOrmRepository} from "../../repository/typeOrm/user/UserTypeOrmRepository";
import {BaseUseCaseInterface} from "../BaseUseCaseInterface";
import {LoginInputDTO} from "../../dto/user/LoginInputDTO";
import bcrypt from "bcrypt";
import {BadRequestException} from "../../common/exceptions/BadRequestException";
import {LoginOutputDTO} from "../../dto/user/LoginOutputDTO";
import jsonwebtoken from "jsonwebtoken"
import {config} from "dotenv"


config();

const JWT_SECRET = process.env.JWT_SECRET || "AXFZqb2QzfK1x4by7SIhhkrs9ucYmtd5"

export class LoginUserUseCase implements BaseUseCaseInterface{
    private readonly repository: UserTypeOrmRepository;
    constructor(repository: UserTypeOrmRepository) {
        this.repository = repository;
    }

    async execute(loginDTO: LoginInputDTO): Promise<LoginOutputDTO> {
        const user = await this.repository.getByUsername(loginDTO.validatedData.userName)
        if (!bcrypt.compareSync(loginDTO.validatedData.password, user.initialData.password)){
            throw new BadRequestException('Invalid user password');
        }
        const token = jsonwebtoken.sign({
            data: user.validatedData
        }, JWT_SECRET, { expiresIn: '1h' });

        return new LoginOutputDTO({token: token})
    }
}