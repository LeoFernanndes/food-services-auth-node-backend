import {UserTypeOrmRepository} from "../../repository/typeOrm/user/UserTypeOrmRepository";
import {BaseUseCaseInterface} from "../BaseUseCaseInterface";
import {UserDTO} from "../../dto/user/UserDTO";


export class DeleteUserByIdUseCase implements BaseUseCaseInterface{
    private readonly repository: UserTypeOrmRepository;
    constructor(repository: UserTypeOrmRepository) {
        this.repository = repository;
    }

    async execute(id: number | string ): Promise<UserDTO> {
        return await this.repository.deleteById(id)
    }
}