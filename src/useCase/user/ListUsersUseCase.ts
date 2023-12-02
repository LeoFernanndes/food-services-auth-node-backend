import {UserTypeOrmRepository} from "../../repository/typeOrm/user/UserTypeOrmRepository";
import {UserOutputDTO} from "../../dto/user/UserOutputDTO";
import {BaseUseCaseInterface} from "../BaseUseCaseInterface";
import {BaseDTO} from "../../dto/BaseDTO";


export class ListUsersUseCase implements BaseUseCaseInterface {
    private readonly repository: UserTypeOrmRepository;
    constructor(repository: UserTypeOrmRepository) {
        this.repository = repository;
    }

    async execute();
    async execute(): Promise<UserOutputDTO[]> {
        return await this.repository.getAll()
    }
}