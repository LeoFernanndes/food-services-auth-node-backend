import jsonwebtoken, {JwtPayload} from "jsonwebtoken";
import {UserDataClass} from "../../dto/user/dataClass/UserDataClass";
import {TokenDTO} from "../../dto/user/TokenDTO";
import {TokenDataClass} from "../../dto/user/dataClass/TokenDataClass";
import {UserOrmDTO} from "../../dto/user/UserOrmDTO";
import {UserEntity} from "../../entity/UserEntity";

// TODO: Center configuration variables in one file
const JWT_SECRET = process.env.JWT_SECRET || "AXFZqb2QzfK1x4by7SIhhkrs9ucYmtd5"

export class TokenEnconder {
    static encode(userDTO: UserOrmDTO<UserDataClass, UserEntity>, expirationTimeSeconds: number): TokenDTO<TokenDataClass> {
        const token = jsonwebtoken.sign({
            data: userDTO.validatedData
        }, JWT_SECRET, { expiresIn: Math.trunc(expirationTimeSeconds) });
        return new TokenDTO<TokenDataClass>({token: token}, TokenDataClass);
    }

    static decode(loginOutputDTO: TokenDTO<TokenDataClass>): UserOrmDTO<UserDataClass, UserEntity> {
        const authData = jsonwebtoken.verify(loginOutputDTO.validatedData.token, JWT_SECRET)
        let returnedUserData: UserDataClass = {
            id: 0,
            firstName: '',
            lastName: '',
            age: 0,
            username: '',
            password: ''
        }
        for (let property in returnedUserData){
            returnedUserData[property] = authData['data'][property]
        }
        returnedUserData['password'] = 'paswodPlacerolder'
        return new UserOrmDTO<UserDataClass, UserEntity>(returnedUserData, UserDataClass, UserEntity, {dtoEntityFieldNames: ['id', 'firstName', 'lastName', 'age', 'username'], safe:true});
    }
}