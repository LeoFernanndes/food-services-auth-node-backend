import {UserInputDTO} from "../../dto/user/UserInputDTO";
import {UserOutputDTO} from "../../dto/user/UserOutputDTO";
import {UserTypeOrmRepository} from "../../repository/typeOrm/user/UserTypeOrmRepository";
import {BaseUseCaseInterface} from "../BaseUseCaseInterface";


export class UpdateUserUseCase implements BaseUseCaseInterface{
    private readonly repository: UserTypeOrmRepository;
    constructor(repository: UserTypeOrmRepository) {
        this.repository = repository;
    }

    async execute(id: number| string, userDTO: UserInputDTO): Promise<UserOutputDTO> {
        return this.repository.update(id, userDTO)
    }
}