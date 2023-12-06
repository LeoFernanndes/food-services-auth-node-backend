import {User} from "../User";
import {UserDataClass} from "../../dto/user/UserDataClass";


describe('instantiation', () => {
    it('should return an User entity', () => {
        const createdUser = new User();
        createdUser.id = 1
        createdUser.firstName = 'name'
        createdUser.lastName = 'surname'
        createdUser.age = 30

        const userDataInterface: UserDataClass = {
            id: 1,
            firstName: 'name',
            lastName: 'surname',
            age: 30
        }
        expect(createdUser).toEqual(userDataInterface)
    });
});

