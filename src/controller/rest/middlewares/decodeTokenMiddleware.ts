import {NextFunction, Response} from "express";
import {config} from "dotenv";
import {FSExpressRequest} from "../FSExpressRequest";
import {ValidateTokenUseCase} from "../../../useCase/user/ValidateTokenUseCase";
import {UserTypeOrmRepository} from "../../../repository/typeOrm/user/UserTypeOrmRepository";
import {AppDataSource} from "../../../DataSource";
import {TokenDTO} from "../../../dto/user/TokenDTO";


config();

// TODO: Create a generic middleware structure to make it better testable
export async function decodeTokenMiddleware(req: FSExpressRequest, res: Response, next: NextFunction){
    const token = req.headers.authorization
    if(token){
        try {
            const parsedToken = token.split('Bearer ')[1]
            const tokenInputDTO = new TokenDTO({token: parsedToken})
            const userTypeormRepository = new UserTypeOrmRepository(AppDataSource)
            const validateTokenUseCase = new ValidateTokenUseCase(userTypeormRepository)
            const tokenOutputDTO = await validateTokenUseCase.execute(tokenInputDTO)
            req.authData = tokenOutputDTO.validatedData
            next();
            } catch (error){
            next()
        }
    } else {
        next();
    }
}
