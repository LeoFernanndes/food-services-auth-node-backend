import express, {Request, Response} from "express";
import {CreateUserUseCase} from "../../useCase/user/CreateUserUseCase";
import {UserInputDTO} from "../../dto/user/UserInputDTO"
import {UserOutputDTO} from "../../dto/user/UserOutputDTO";
import {ListUsersUseCase} from "../../useCase/user/ListUsersUseCase";
import {UserTypeOrmRepository} from "../../repository/typeOrm/user/UserTypeOrmRepository";
import {User} from "../../entity/User";
import {GetUserByIdUseCase} from "../../useCase/user/GetUserByIdUseCase";
import {UserDataClass} from "../../dto/user/UserDataClass";
import {DeleteUserByIdUseCase} from "../../useCase/user/DeleteUserByIdUseCase";
import {NotFoundException} from "../../common/exceptions/NotFound";
import {validatePayloadMiddleware} from "./middlewares/validatePayloadMiddleware";
import {UpdateUserUseCase} from "../../useCase/user/UpdateUserUseCase";


// TODO: decide where and how to validate data by instantiating new DTO inside routes
// TODO: create a plain to dto conversion tool

export const router = express.Router();


router.post('/', validatePayloadMiddleware(new UserDataClass()), async (req, res) => {
    const payloadUser = req.body
    const usersRepository: UserTypeOrmRepository = new UserTypeOrmRepository(User);
    const createUserUseCase: CreateUserUseCase = new CreateUserUseCase(usersRepository);
    const userDTO: UserInputDTO = new UserInputDTO(payloadUser);
    const createdUserDTO: UserOutputDTO = await createUserUseCase.execute(userDTO);
    const plainObjectResponse = createdUserDTO.validatedData
    res.status(201).json(plainObjectResponse);
});

router.get('/', async (req, res) => {
    const usersRepository = new UserTypeOrmRepository(User);
    const listUsersUseCase: ListUsersUseCase = new ListUsersUseCase(usersRepository);
    const users: UserOutputDTO[] = await listUsersUseCase.execute();
    const plainObjectsResponse: UserDataClass[] = []
    users.forEach(user => {
        plainObjectsResponse.push(user.validatedData)
    })
    res.status(200).json(plainObjectsResponse);
});

router.get('/:id', async (req, res) => {
    const userId = req.params.id
    const usersRepository = new UserTypeOrmRepository(User);
    const getUserByIdUseCase: GetUserByIdUseCase = new GetUserByIdUseCase(usersRepository);
    try {
        const user: UserOutputDTO = await getUserByIdUseCase.execute(userId);
        const plainObjectResponse: UserDataClass = user.validatedData
        res.status(200).json(plainObjectResponse);
    } catch (error) {
        if (error instanceof NotFoundException){
            res.status(404).json({'detail': error.message})
        } else {
            res.status(500).json({'detail': 'Internal server error'})
        }
    }
});

router.put('/:id', validatePayloadMiddleware(new UserDataClass()), async (req, res) => {
    const userId = req.params.id
    const payloadUser = req.body
    const usersRepository: UserTypeOrmRepository = new UserTypeOrmRepository(User);
    const createUserUseCase: UpdateUserUseCase = new UpdateUserUseCase(usersRepository);
    const userDTO: UserInputDTO = new UserInputDTO(payloadUser);
    try {
        const createdUserDTO: UserOutputDTO = await createUserUseCase.execute(userId, userDTO);
        const plainObjectResponse = createdUserDTO.validatedData
        res.status(201).json(plainObjectResponse);
    } catch (error) {
        if (error instanceof NotFoundException) {
            res.status(404).json({'detail': error.message})
        } else {
            res.status(500).json({'detail': 'Internal server error'})
        }
    }
});


router.delete('/:id', async (req, res) => {
    const userId = req.params.id
    const usersRepository = new UserTypeOrmRepository(User);
    const deleteUserByIdUseCase: DeleteUserByIdUseCase = new DeleteUserByIdUseCase(usersRepository);
    try {
        const user: UserOutputDTO = await deleteUserByIdUseCase.execute(userId);
        res.status(204).json({'detail': 'No content'});
    } catch (error) {
        if (error instanceof NotFoundException) {
            res.status(404).json({'detail': error.message})
        } else {
            res.status(500).json({'detail': 'Internal server error'})
        }
    }
});
