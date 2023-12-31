import {RabbitMqMessage} from "../infra/amqp/RabbitMqMessage";
import {UserTypeOrmRepository} from "../repository/typeOrm/user/UserTypeOrmRepository";
import {TypeOrmRepository} from "../repository/typeOrm/TypeOrmRepository";
import {FSBaseEntity} from "../entity/FSBaseEntity";
import {BaseDataClass} from "../dto/BaseDataClass";
import {BaseOrmDTO} from "../dto/BaseOrmDTO";

export abstract class BaseUseCase {
    protected readonly repository: TypeOrmRepository<FSBaseEntity, BaseOrmDTO<BaseDataClass, FSBaseEntity>>;
    protected readonly messageDispatcher;
    protected constructor(repository: TypeOrmRepository<FSBaseEntity, BaseOrmDTO<BaseDataClass, FSBaseEntity>>, messageDispatcher?) {
        this.repository = repository;
        this.messageDispatcher = messageDispatcher;
    }
    protected dispatchMessage(message: RabbitMqMessage) {
        if(this.messageDispatcher){
            this.messageDispatcher(JSON.stringify(message))
        } else {
            return
        }
    }
}