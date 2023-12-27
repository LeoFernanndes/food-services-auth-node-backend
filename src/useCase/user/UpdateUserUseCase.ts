import {UserTypeOrmRepository} from "../../repository/typeOrm/user/UserTypeOrmRepository";
import {BaseUseCaseInterface} from "../BaseUseCaseInterface";
import {UserOrmDTO} from "../../dto/user/UserOrmDTO";
import {UserDataClass} from "../../dto/user/dataClass/UserDataClass";
import {User} from "../../entity/User";


export class UpdateUserUseCase implements BaseUseCaseInterface{
    private readonly repository: UserTypeOrmRepository;
    constructor(repository: UserTypeOrmRepository) {
        this.repository = repository;
    }

    async execute(id: number| string, userDTO: UserOrmDTO<UserDataClass, User>): Promise<UserOrmDTO<UserDataClass, User>> {
        return this.repository.update(id, userDTO)
    }
}