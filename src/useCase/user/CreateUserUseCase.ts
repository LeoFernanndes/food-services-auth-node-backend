import {UserInputDTO} from "../../dto/user/UserInputDTO";
import {UserOutputDTO} from "../../dto/user/UserOutputDTO";
import {UserTypeOrmRepository} from "../../repository/typeOrm/user/UserTypeOrmRepository";
import {BaseUseCaseInterface} from "../BaseUseCaseInterface";


export class CreateUserUseCase implements BaseUseCaseInterface{
    private readonly repository: UserTypeOrmRepository;
    constructor(repository: UserTypeOrmRepository) {
        this.repository = repository;
    }

    async execute(userDTO: UserInputDTO): Promise<UserOutputDTO> {
        return this.repository.create(userDTO)
    }
}