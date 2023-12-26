import {UserTypeOrmRepository} from "../../repository/typeOrm/user/UserTypeOrmRepository";
import {BaseUseCaseInterface} from "../BaseUseCaseInterface";
import {UserDTO} from "../../dto/user/UserDTO";


export class ListUsersUseCase implements BaseUseCaseInterface {
    private readonly repository: UserTypeOrmRepository;
    constructor(repository: UserTypeOrmRepository) {
        this.repository = repository;
    }

    async execute(): Promise<UserDTO[]> {
        return await this.repository.getAll()
    }
}