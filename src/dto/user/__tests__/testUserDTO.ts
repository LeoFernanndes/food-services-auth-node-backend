import {UserDTO} from "../UserDTO";
import {UserDataClass} from "../UserDataClass";


describe('UserDTO wrong instantiation - invalid properties', () => {

    it("should fail to create an userDTO", async () => {

        const userDataInterface: UserDataClass = {
            firstName: 'a'.repeat(51),
            lastName: 'a'.repeat(51),
            age: 151,
            userName: 'a'.repeat(51),
            password: 'a'.repeat(101)
        }

        expect.assertions(1)

        try {
            new UserDTO(userDataInterface, ['id', 'firstName', 'lastName', 'age', 'userName', 'password'])
        } catch (error) {
            expect(error).toHaveLength(5)
        }
    });
})

describe('UserDTO right instantiation', () => {

    it("should successfully create an userDTO", async () => {

        const userDataInterface: UserDataClass = {
            firstName: 'a'.repeat(49),
            lastName: 'a'.repeat(49),
            age: 149,
            userName: 'a'.repeat(49),
            password: 'a'.repeat(99)
        }
        const userDTO = new UserDTO(userDataInterface, ['id', 'firstName', 'lastName', 'age', 'userName', 'password'])

        // expect(userDTO.validationErrors).toHaveLength(0);
        expect(userDTO.validatedData.id).toBeUndefined();
        expect(userDTO.validatedData.firstName).toEqual(userDataInterface.firstName);
        expect(userDTO.validatedData.lastName).toEqual(userDataInterface.lastName);
        expect(userDTO.validatedData.age).toEqual(userDataInterface.age);
        expect(userDTO.validatedData.userName).toEqual(userDataInterface.userName);
        expect(userDTO.validatedData.password).toBeDefined();
        expect(userDTO.initialData).toEqual(userDataInterface);
    });

})