import {UserTypeOrmRepository} from "../../repository/typeOrm/user/UserTypeOrmRepository";
import {BaseUseCaseInterface} from "../BaseUseCaseInterface";
import {UserDTO} from "../../dto/user/UserDTO";


export class UpdateUserUseCase implements BaseUseCaseInterface{
    private readonly repository: UserTypeOrmRepository;
    constructor(repository: UserTypeOrmRepository) {
        this.repository = repository;
    }

    async execute(id: number| string, userDTO: UserDTO): Promise<UserDTO> {
        return this.repository.update(id, userDTO)
    }
}