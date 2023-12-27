import {ControllerOptions, FSController} from "../FSController";
import {FSControllerRequest} from "../FSControllerRequest";
import {FSControllerResponse} from "../FSControllerResponse";
import {UserTypeOrmRepository} from "../../../repository/typeOrm/user/UserTypeOrmRepository";
import {CreateUserUseCase} from "../../../useCase/user/CreateUserUseCase";
import {UserOrmDTO} from "../../../dto/user/UserOrmDTO";
import {UserDataClass} from "../../../dto/user/dataClass/UserDataClass";
import {User} from "../../../entity/User";
import {BadRequestException} from "../../../common/exceptions/BadRequestException";
import {ListUsersUseCase} from "../../../useCase/user/ListUsersUseCase";
import {GetUserByIdUseCase} from "../../../useCase/user/GetUserByIdUseCase";
import {NotFoundException} from "../../../common/exceptions/NotFoundException";
import {UpdateUserUseCase} from "../../../useCase/user/UpdateUserUseCase";
import {DeleteUserByIdUseCase} from "../../../useCase/user/DeleteUserByIdUseCase";


export class UserController extends FSController {

    constructor(request: FSControllerRequest, options?: ControllerOptions) {
        super(request, options);
    }

    async createUser(): Promise<FSControllerResponse> {
        const payloadUser = this.request.body;
        const usersRepository = new UserTypeOrmRepository(this.appDataSource);
        const createUserUseCase = new CreateUserUseCase(usersRepository, this.messageDispatcher);
        const userDTO = new UserOrmDTO<UserDataClass, User>(payloadUser, UserDataClass, User, ['id', 'firstName', 'lastName', 'age', 'userName', 'password']);
        try {
            const createdUserDTO = await createUserUseCase.execute(userDTO);
            const plainObjectResponse = createdUserDTO.validatedData
            this.response.status = 201;
            this.response.data = plainObjectResponse;
        } catch (error) {
            if (error instanceof BadRequestException){
                this.response.status = 400;
                this.response.data = {'detail': error.message};
            } else {
                console.log(error)
                this.response.status = 500;
                this.response.data = {'detail': 'Internal server error'};
            }
        }
        return this.response;
    }

    async listUsers(): Promise<FSControllerResponse> {
        const usersRepository = new UserTypeOrmRepository(this.appDataSource);
        const listUsersUseCase = new ListUsersUseCase(usersRepository, this.messageDispatcher);
        const users = await listUsersUseCase.execute();
        const plainObjectsResponse: UserDataClass[] = [];
        users.forEach(user => {
            plainObjectsResponse.push(user.validatedData)
        })
        this.response.status = 200;
        this.response.data = plainObjectsResponse;
        return this.response;
    }

    async getUserById(): Promise<FSControllerResponse> {
        const userId = this.request.params.id;
        const usersRepository = new UserTypeOrmRepository(this.appDataSource);
        const getUserByIdUseCase = new GetUserByIdUseCase(usersRepository, this.messageDispatcher);
        try {
            const user = await getUserByIdUseCase.execute(userId);
            const plainObjectResponse: UserDataClass = user.validatedData;
            this.response.status = 200;
            this.response.data = plainObjectResponse;
        } catch (error) {
            if (error instanceof NotFoundException){
                this.response.status = 400;
                this.response.data = {'detail': error.message}
            } else {
                this.response.status = 500;
                this.response.data = {'detail': 'Internal server error'}
            }
        }
        return this.response;
    }

    async updateUserByID(): Promise<FSControllerResponse> {
        const userId = this.request.params.id
        const payloadUser = this.request.body
        const usersRepository = new UserTypeOrmRepository(this.appDataSource);
        const updateUserUseCase = new UpdateUserUseCase(usersRepository, this.messageDispatcher);
        const userDTO = new UserOrmDTO(payloadUser, UserDataClass, User, ['firstName', 'lastName', 'age']);
        try {
            const createdUserDTO = await updateUserUseCase.execute(userId, userDTO);
            const plainObjectResponse = createdUserDTO.validatedData
            this.response.status = 200;
            this.response.data = plainObjectResponse;
        } catch (error) {
            if (error instanceof NotFoundException) {
                this.response.status = 404;
                this.response.data = {'detail': error.message};
            } else {
                this.response.status = 500;
                this.response.data = {'detail': 'Internal server error'};
            }
        }
        return this.response;
    }

    async deleteUserById(): Promise<FSControllerResponse> {
        const userId = this.request.params.id;
        const usersRepository = new UserTypeOrmRepository(this.appDataSource);
        const deleteUserByIdUseCase = new DeleteUserByIdUseCase(usersRepository, this.messageDispatcher);
        try {
            const user = await deleteUserByIdUseCase.execute(userId);
            this.response.status = 204;
            this.response.data = {'detail': 'No content'};
        } catch (error) {
            if (error instanceof NotFoundException) {
                this.response.status = 404
                this.response.data = {'detail': error.message};
            } else {
                this.response.status = 500;
                this.response.data = {'detail': 'Internal server error'};
            }
        }
        return this.response;
    }
}