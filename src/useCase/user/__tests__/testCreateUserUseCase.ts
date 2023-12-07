import {initDbStoreForTests} from "../../../testDataSource";
import {UserTypeOrmRepository} from "../../../repository/typeOrm/user/UserTypeOrmRepository";
import {CreateUserUseCase} from "../CreateUserUseCase";
import {UserInputDTO} from "../../../dto/user/UserInputDTO";
import {UserOutputDTO} from "../../../dto/user/UserOutputDTO";
import {UserDataClass} from "../../../dto/user/UserDataClass";
import {DataSource} from "typeorm";


let dataSource: DataSource;

describe("test create user usecase", () => {
    beforeEach(async () => {
        dataSource = await initDbStoreForTests()
    })

    afterAll(async () => {
        await dataSource.destroy()
    })

    it("should successfully create an user", async () => {

        const userDataInterface: UserDataClass = {
            firstName: 'name',
            lastName: 'surname',
            age: 30,
            userName: 'name',
            password: 'password'
        }

        const usersRepository: UserTypeOrmRepository = new UserTypeOrmRepository(dataSource);
        const createUserUseCase: CreateUserUseCase = new CreateUserUseCase(usersRepository);
        const userDTO: UserInputDTO = new UserInputDTO(userDataInterface);
        const createdUserDTO: UserOutputDTO = await createUserUseCase.execute(userDTO);
        const plainObjectResponse = createdUserDTO.validatedData

        expect(plainObjectResponse.id).toBe(1)
        expect(plainObjectResponse.firstName).toBe(userDataInterface.firstName)
        expect(plainObjectResponse.lastName).toBe(userDataInterface.lastName)
        expect(plainObjectResponse.age).toBe(userDataInterface.age)
        expect(plainObjectResponse.userName).toBe(userDataInterface.userName)
    });
});