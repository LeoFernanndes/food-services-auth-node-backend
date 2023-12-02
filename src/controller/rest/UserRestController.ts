import express from "express";
import {CreateUserUseCase} from "../../useCase/user/CreateUserUseCase";
import {UserInputDTO} from "../../dto/user/UserInputDTO"
import {UserOutputDTO} from "../../dto/user/UserOutputDTO";
import {ListUsersUseCase} from "../../useCase/user/ListUsersUseCase";
import {UserTypeOrmRepository} from "../../repository/typeOrm/user/UserTypeOrmRepository";
import {User} from "../../entity/User";
import {GetUserByIdUseCase} from "../../useCase/user/GetUserByIdUseCase";


// TODO: decide where and how to validate data by instantiating new DTO inside routes


export const router = express.Router();

router.post('/', async (req, res): Promise<UserOutputDTO> => {
    const payloadUser: UserOutputDTO = req.body.user
    const usersRepository: UserTypeOrmRepository = new UserTypeOrmRepository(User);
    const createUserUseCase: CreateUserUseCase = new CreateUserUseCase(usersRepository);
    const userDTO: UserInputDTO = new UserInputDTO(payloadUser);
    const createdUserDTO: UserOutputDTO = await createUserUseCase.execute(userDTO.validatedData);
    res.status(201).json(createdUserDTO);
});

router.get('/', async (req, res): Promise<UserOutputDTO[]> => {
    const usersRepository = new UserTypeOrmRepository(User);
    const listUsersUseCase: ListUsersUseCase = new ListUsersUseCase(usersRepository);
    const users: UserOutputDTO[] = await listUsersUseCase.execute();
    res.status(200).json(users);
});

router.get('/:id', async (req, res): Promise<UserOutputDTO[]> => {
    const userId = req.query.id
    const usersRepository = new UserTypeOrmRepository(User);
    const getUserByIdUseCase: GetUserByIdUseCase = new GetUserByIdUseCase(usersRepository);
    const user: UserOutputDTO = await getUserByIdUseCase.execute(userId);
    res.status(200).json(user);
});