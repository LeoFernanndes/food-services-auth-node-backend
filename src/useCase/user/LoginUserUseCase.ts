import {UserOutputDTO} from "../../dto/user/UserOutputDTO";
import {UserTypeOrmRepository} from "../../repository/typeOrm/user/UserTypeOrmRepository";
import {BaseUseCaseInterface} from "../BaseUseCaseInterface";
import {LoginInputDTO} from "../../dto/user/LoginInputDTO";
import bcrypt from "bcrypt";
import {BadRequestException} from "../../common/exceptions/BadRequestException";


export class LoginUserUseCase implements BaseUseCaseInterface{
    private readonly repository: UserTypeOrmRepository;
    constructor(repository: UserTypeOrmRepository) {
        this.repository = repository;
    }

    async execute(loginDTO: LoginInputDTO): Promise<UserOutputDTO> {
        const user = await this.repository.getByUsername(loginDTO.validatedData.userName)
        if (!bcrypt.compareSync(loginDTO.validatedData.password, user.initialData.password)){
            throw new BadRequestException('Invalid user password');
        }
        return user
    }
}