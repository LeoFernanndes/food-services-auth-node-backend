import {UserInputDTO} from "../UserInputDTO";
import {UserDataClass} from "../UserDataClass";


describe('UserInputDTO wrong instantiation - invalid properties', () => {

    it("should fail to create an userInputDTO", async () => {

        const userDataInterface: UserDataClass = {
            firstName: 'a'.repeat(51),
            lastName: 'a'.repeat(51),
            age: 151,
            userName: 'a'.repeat(51),
            password: 'a'.repeat(101)
        }

        expect.assertions(1)

        try {
            new UserInputDTO(userDataInterface)
        } catch (error) {
            expect(error).toHaveLength(5)
        }
    });
})

describe('UserInputDTO right instantiation', () => {

    it("should successfully create an userInputDTO", async () => {

        const userDataInterface: UserDataClass = {
            firstName: 'a'.repeat(49),
            lastName: 'a'.repeat(49),
            age: 149,
            userName: 'a'.repeat(49),
            password: 'a'.repeat(99)
        }
        const userDTO = new UserInputDTO(userDataInterface)

        expect(userDTO.validationErrors).toHaveLength(0);
        expect(userDTO.validatedData.id).toBeUndefined();
        expect(userDTO.validatedData.firstName).toEqual(userDataInterface.firstName);
        expect(userDTO.validatedData.lastName).toEqual(userDataInterface.lastName);
        expect(userDTO.validatedData.age).toEqual(userDataInterface.age);
        expect(userDTO.validatedData.userName).toEqual(userDataInterface.userName);
        expect(userDTO.validatedData.password).toBeDefined();
        expect(userDTO.initialData).toEqual(userDataInterface);
    });

})