import jsonwebtoken, {JwtPayload} from "jsonwebtoken";
import {UserDataClass} from "../../dto/user/dataClass/UserDataClass";
import {TokenDTO} from "../../dto/user/TokenDTO";
import {TokenDataClass} from "../../dto/user/dataClass/TokenDataClass";
import {UserOrmDTO} from "../../dto/user/UserOrmDTO";
import {User} from "../../entity/User";

// TODO: Center configuration variables in one file
const JWT_SECRET = process.env.JWT_SECRET || "AXFZqb2QzfK1x4by7SIhhkrs9ucYmtd5"

export class TokenEnconder {
    static encode(userDTO: UserOrmDTO<UserDataClass, User>, expirationTimeSeconds: number): TokenDTO<TokenDataClass> {
        const token = jsonwebtoken.sign({
            data: userDTO.validatedData
        }, JWT_SECRET, { expiresIn: Math.trunc(expirationTimeSeconds) });
        return new TokenDTO<TokenDataClass>({token: token}, TokenDataClass);
    }

    static decode(loginOutputDTO: TokenDTO<TokenDataClass>): UserOrmDTO<UserDataClass, User> {
        const authData = jsonwebtoken.verify(loginOutputDTO.validatedData.token, JWT_SECRET)
        let returnedUserData: UserDataClass = {
            id: 0,
            firstName: '',
            lastName: '',
            age: 0,
            userName: '',
            password: ''
        }
        for (let property in returnedUserData){
            returnedUserData[property] = authData['data'][property]
        }
        returnedUserData['password'] = 'paswodPlacerolder'
        return new UserOrmDTO<UserDataClass>(returnedUserData, UserDataClass, User, ['id', 'firstName', 'lastName', 'age', 'userName']);
    }
}