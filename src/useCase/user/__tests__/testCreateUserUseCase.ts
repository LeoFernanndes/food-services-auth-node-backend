import {initDbStoreForTests} from "../../../testDataSource";
import {UserTypeOrmRepository} from "../../../repository/typeOrm/user/UserTypeOrmRepository";
import {CreateUserUseCase} from "../CreateUserUseCase";
import {UserDataClass} from "../../../dto/user/UserDataClass";
import {DataSource} from "typeorm";
import {UserDTO} from "../../../dto/user/UserDTO";


let dataSource: DataSource;

describe("test create user usecase", () => {
    beforeEach(async () => {
        dataSource = await initDbStoreForTests()
    })

    afterEach(async () => {
        await dataSource.destroy()
    })

    it("should successfully create an user", async () => {

        const userDataInterface: UserDataClass = {
            firstName: 'name',
            lastName: 'surname',
            age: 30,
            userName: 'username',
            password: 'password'
        }

        const usersRepository: UserTypeOrmRepository = new UserTypeOrmRepository(dataSource);
        const createUserUseCase: CreateUserUseCase = new CreateUserUseCase(usersRepository);
        const userDTO: UserDTO = new UserDTO(userDataInterface, ['id', 'firstName', 'lastName', 'age', 'userName', 'password']);
        const createdUserDTO: UserDTO = await createUserUseCase.execute(userDTO);
        const plainObjectResponse = createdUserDTO.validatedData

        expect(plainObjectResponse.id).toBe(1)
        expect(plainObjectResponse.firstName).toBe(userDataInterface.firstName)
        expect(plainObjectResponse.lastName).toBe(userDataInterface.lastName)
        expect(plainObjectResponse.age).toBe(userDataInterface.age)
        expect(plainObjectResponse.userName).toBe(userDataInterface.userName)
    });

    it("should fail to create an user with missing password", async () => {

        const userDataInterface: UserDataClass = {
            firstName: 'name',
            lastName: 'surname',
            age: 30,
            userName: 'username',
            password: 'password'
        }

        const usersRepository: UserTypeOrmRepository = new UserTypeOrmRepository(dataSource);
        const createUserUseCase: CreateUserUseCase = new CreateUserUseCase(usersRepository);
        const userDTO: UserDTO = new UserDTO(userDataInterface);
        try {
            const createdUserDTO: UserDTO = await createUserUseCase.execute(userDTO);
        } catch (error) {
            expect(error.message).toEqual('SQLITE_CONSTRAINT: NOT NULL constraint failed: user.password');
        }
    });

    it("should fail to create an user with missing fields", async () => {

        const userDataInterface: UserDataClass = new UserDataClass();

        const usersRepository: UserTypeOrmRepository = new UserTypeOrmRepository(dataSource);
        const createUserUseCase: CreateUserUseCase = new CreateUserUseCase(usersRepository);
        const userDTO: UserDTO = new UserDTO(userDataInterface);
        try {
            const createdUserDTO: UserDTO = await createUserUseCase.execute(userDTO);
        } catch (error) {
            expect(error.message).toContain('SQLITE_CONSTRAINT: NOT NULL constraint failed');
        }
    });
});