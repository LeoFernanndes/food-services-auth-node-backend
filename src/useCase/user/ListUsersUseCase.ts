import {UserTypeOrmRepository} from "../../repository/typeOrm/user/UserTypeOrmRepository";
import {BaseUseCaseInterface} from "../BaseUseCaseInterface";
import {UserDTO} from "../../dto/user/UserDTO";
import {UserOrmDTO} from "../../dto/user/UserOrmDTO";
import {UserDataClass} from "../../dto/user/dataClass/UserDataClass";
import {User} from "../../entity/User";


export class ListUsersUseCase implements BaseUseCaseInterface {
    private readonly repository: UserTypeOrmRepository;
    constructor(repository: UserTypeOrmRepository) {
        this.repository = repository;
    }

    async execute(): Promise<UserOrmDTO<UserDataClass, User>[]> {
        return await this.repository.getAll()
    }
}