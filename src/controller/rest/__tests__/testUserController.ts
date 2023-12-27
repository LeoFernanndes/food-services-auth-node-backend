import {DataSource} from "typeorm";
import {initDbStoreForTests} from "../../../testDataSource";
import {UserDataClass} from "../../../dto/user/dataClass/UserDataClass";
import {FSControllerRequest} from "../FSControllerRequest";
import {UserController} from "../user/UserController";
import {UserTypeOrmRepository} from "../../../repository/typeOrm/user/UserTypeOrmRepository";


let dataSource: DataSource;


describe("Test UserController Create", () => {
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

        const request = new FSControllerRequest(userDataInterface, {}, {}, {});
        const userController = new UserController(request, {appDataSource:dataSource});
        const response = await userController.createUser();

        expect(response.status).toEqual(201);
        expect(response.data).toBeInstanceOf(UserDataClass)
        expect(response.data.id).toBe(1)
        expect(response.data.firstName).toBe(userDataInterface.firstName)
        expect(response.data.lastName).toBe(userDataInterface.lastName)
        expect(response.data.age).toBe(userDataInterface.age)
        expect(response.data.userName).toBe(userDataInterface.userName)
    });
});


describe("Test UserController Update", () => {
    beforeEach(async () => {
        dataSource = await initDbStoreForTests()
    })

    afterEach(async () => {
        await dataSource.destroy()
    })

    it("should successfully update an user", async () => {

        const userDataInterface: UserDataClass = {
            firstName: 'name',
            lastName: 'surname',
            age: 30,
            userName: 'username',
            password: 'password'
        }

        // first creates the user to be updated
        const request = new FSControllerRequest(userDataInterface, {}, {}, {});
        const userController = new UserController(request, {appDataSource:dataSource});
        const response = await userController.createUser();

        const updateUserDataInterface: UserDataClass = {
            firstName: 'updatedName',
            lastName: 'updatedSurname',
            age: 40,
            userName: 'username',
            password: 'password'
        }

        const requestUpdate = new FSControllerRequest(updateUserDataInterface, {}, {id: 1}, {});
        const userControllerUpdate = new UserController(requestUpdate, {appDataSource:dataSource});
        const responseUpdate = await userControllerUpdate.updateUserByID();
        expect(responseUpdate.status).toEqual(200);
        expect(responseUpdate.data).toBeInstanceOf(UserDataClass)
        expect(responseUpdate.data.id).toBe(1)
        expect(responseUpdate.data.firstName).toBe(updateUserDataInterface.firstName)
        expect(responseUpdate.data.lastName).toBe(updateUserDataInterface.lastName)
        expect(responseUpdate.data.age).toBe(updateUserDataInterface.age)
        expect(responseUpdate.data.userName).toBe(updateUserDataInterface.userName)
    });

    it("should fail to update user with 404", async () => {

        const updateUserDataInterface: UserDataClass = {
            firstName: 'updatedName',
            lastName: 'updatedSurname',
            age: 40,
            userName: 'username',
            password: 'password'
        }

        const requestUpdate = new FSControllerRequest(updateUserDataInterface, {}, {id: 1}, {});
        const userControllerUpdate = new UserController(requestUpdate, {appDataSource:dataSource});
        const responseUpdate = await userControllerUpdate.updateUserByID();
        expect(responseUpdate.status).toEqual(404);
        expect(responseUpdate.data).toEqual({ 'detail': 'User with id 1 was not found' });
    });

});

describe("Test UserController List", () => {
    beforeEach(async () => {
        dataSource = await initDbStoreForTests()
    })

    afterEach(async () => {
        await dataSource.destroy()
    })

    it("should successfully list users", async () => {

        const userDataInterface: UserDataClass = {
            firstName: 'name',
            lastName: 'surname',
            age: 30,
            userName: 'username',
            password: 'password'
        }

        // first created user
        const request = new FSControllerRequest(userDataInterface, {}, {}, {});
        const userController = new UserController(request, {appDataSource:dataSource});
        const response = await userController.createUser();

        const userDataInterface2: UserDataClass = {
            firstName: 'name',
            lastName: 'surname',
            age: 30,
            userName: 'username1',
            password: 'password1'
        }

        // second created user
        const request2 = new FSControllerRequest(userDataInterface2, {}, {}, {});
        const userController2 = new UserController(request2, {appDataSource:dataSource});
        const response2 = await userController2.createUser();

        const requestList = new FSControllerRequest({}, {}, {}, {});
        const userControllerList = new UserController(requestList, {appDataSource:dataSource});
        const responseList = await userControllerList.listUsers();

        expect(responseList.status).toEqual(200);
        expect(responseList.data).toHaveLength(2)
    });
});

describe("Test UserController Retrieve", () => {
    beforeEach(async () => {
        dataSource = await initDbStoreForTests()
    })

    afterEach(async () => {
        await dataSource.destroy()
    })

    it("should successfully retrieve user", async () => {

        const userDataInterface: UserDataClass = {
            firstName: 'name',
            lastName: 'surname',
            age: 30,
            userName: 'username',
            password: 'password'
        }

        // first created user
        const request = new FSControllerRequest(userDataInterface, {}, {}, {});
        const userController = new UserController(request, {appDataSource:dataSource});
        const response = await userController.createUser();

        const userDataInterface2: UserDataClass = {
            firstName: 'name',
            lastName: 'surname',
            age: 30,
            userName: 'username1',
            password: 'password1'
        }

        // second created user
        const request2 = new FSControllerRequest(userDataInterface2, {}, {}, {});
        const userController2 = new UserController(request2, {appDataSource:dataSource});
        const response2 = await userController2.createUser();

        const requestRetrieve = new FSControllerRequest({}, {}, {id: 2}, {});
        const userControllerRetrieve = new UserController(requestRetrieve, {appDataSource:dataSource});
        const responseRetrieve = await userControllerRetrieve.getUserById();

        expect(responseRetrieve.status).toEqual(200);
        expect(responseRetrieve.status).toEqual(200);
        expect(responseRetrieve.data).toBeInstanceOf(UserDataClass)
        expect(responseRetrieve.data.id).toBe(2)
        expect(responseRetrieve.data.firstName).toBe(userDataInterface2.firstName)
        expect(responseRetrieve.data.lastName).toBe(userDataInterface2.lastName)
        expect(responseRetrieve.data.age).toBe(userDataInterface2.age)
        expect(responseRetrieve.data.userName).toBe(userDataInterface2.userName)
    });

    it("should fail to retrieve user with 404", async () => {
        const requestUpdate = new FSControllerRequest({}, {}, {id: 1}, {});
        const userControllerUpdate = new UserController(requestUpdate, {appDataSource:dataSource});
        const responseUpdate = await userControllerUpdate.updateUserByID();
        expect(responseUpdate.status).toEqual(404);
        expect(responseUpdate.data).toEqual({ 'detail': 'User with id 1 was not found' });
    });
});

describe("Test UserController Delete", () => {
    beforeEach(async () => {
        dataSource = await initDbStoreForTests()
    })

    afterEach(async () => {
        await dataSource.destroy()
    })

    it("should successfully delete user", async () => {

        const userDataInterface: UserDataClass = {
            firstName: 'name',
            lastName: 'surname',
            age: 30,
            userName: 'username',
            password: 'password'
        }

        // first created user
        const request = new FSControllerRequest(userDataInterface, {}, {}, {});
        const userController = new UserController(request, {appDataSource:dataSource});
        const response = await userController.createUser();

        const userDataInterface2: UserDataClass = {
            firstName: 'name',
            lastName: 'surname',
            age: 30,
            userName: 'username1',
            password: 'password1'
        }

        // second created user
        const request2 = new FSControllerRequest(userDataInterface2, {}, {}, {});
        const userController2 = new UserController(request2, {appDataSource:dataSource});
        const response2 = await userController2.createUser();

        const requestDelete = new FSControllerRequest({}, {}, {id: 2}, {});
        const userControllerDelete = new UserController(requestDelete, {appDataSource:dataSource});
        const responseDelete = await userControllerDelete.deleteUserById();

        expect(responseDelete.status).toEqual(204);

        const userRepository = new UserTypeOrmRepository(dataSource)
        const users = await userRepository.getAll()
        expect(users).toHaveLength(1);
    });

    it("should fail to delete user with 404", async () => {
        const requestDelete = new FSControllerRequest({}, {}, {id: 1}, {});
        const userControllerDelete = new UserController(requestDelete, {appDataSource:dataSource});
        const responseDelete = await userControllerDelete.updateUserByID();
        expect(responseDelete.status).toEqual(404);
        expect(responseDelete.data).toEqual({ 'detail': 'User with id 1 was not found' });
    });
});