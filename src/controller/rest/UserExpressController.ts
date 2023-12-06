import express, {Request, Response} from "express";
import {CreateUserUseCase} from "../../useCase/user/CreateUserUseCase";
import {UserInputDTO} from "../../dto/user/UserInputDTO"
import {UserOutputDTO} from "../../dto/user/UserOutputDTO";
import {ListUsersUseCase} from "../../useCase/user/ListUsersUseCase";
import {UserTypeOrmRepository} from "../../repository/typeOrm/user/UserTypeOrmRepository";
import {User} from "../../entity/User";
import {GetUserByIdUseCase} from "../../useCase/user/GetUserByIdUseCase";
import {UserDataClass} from "../../dto/user/UserDataClass";
import {BaseExpressController} from "./BaseExpressController";
import e from "express";
import {testRouterMiddleware} from "./logPayloadMiddleware";
import {DataClass} from "../../dto/DataClass";


// TODO: decide where and how to validate data by instantiating new DTO inside routes
// TODO: create a plain to dto conversion tool

export class UserExpressController implements BaseExpressController {
    router: e.Router;
    constructor(router) {
    }
}


export const router = express.Router();


router.post('/', testRouterMiddleware(new UserDataClass()), async (req, res):  Promise<Response> => {
    const payloadUser = req.body
    const usersRepository: UserTypeOrmRepository = new UserTypeOrmRepository(User);
    const createUserUseCase: CreateUserUseCase = new CreateUserUseCase(usersRepository);
    const userDTO: UserInputDTO = new UserInputDTO(payloadUser);
    const createdUserDTO: UserOutputDTO = await createUserUseCase.execute(userDTO);
    const plainObjectResponse = createdUserDTO.validatedData
    res.status(201).json(plainObjectResponse);
    return
});

router.get('/', async (req, res): Promise<UserOutputDTO[]> => {
    const usersRepository = new UserTypeOrmRepository(User);
    const listUsersUseCase: ListUsersUseCase = new ListUsersUseCase(usersRepository);
    const users: UserOutputDTO[] = await listUsersUseCase.execute();
    const plainObjectsResponse: UserDataClass[] = []
    users.forEach(user => {
        plainObjectsResponse.push(user.validatedData)
    })
    res.status(200).json(plainObjectsResponse);
    return
});

router.get('/:id', async (req, res): Promise<UserOutputDTO[]> => {
    const userId = req.query.id
    const usersRepository = new UserTypeOrmRepository(User);
    const getUserByIdUseCase: GetUserByIdUseCase = new GetUserByIdUseCase(usersRepository);
    const user: UserOutputDTO = await getUserByIdUseCase.execute(userId);
    const plainObjectResponse: UserDataClass = user.validatedData
    res.status(200).json(plainObjectResponse);
    return
});