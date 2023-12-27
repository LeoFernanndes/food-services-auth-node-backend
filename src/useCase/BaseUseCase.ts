import {RabbitMqMessage} from "../infra/amqp/RabbitMqMessage";
import {UserTypeOrmRepository} from "../repository/typeOrm/user/UserTypeOrmRepository";

export abstract class BaseUseCase {
    protected readonly repository: UserTypeOrmRepository;
    protected readonly messageDispatcher;
    protected constructor(repository: UserTypeOrmRepository, messageDispatcher?) {
        this.repository = repository;
        this.messageDispatcher = messageDispatcher;
    }
    protected dispatchMessage(message: RabbitMqMessage) {
        if(this.messageDispatcher){
            this.messageDispatcher(JSON.stringify(message))
        } else {
            console.info(`NOT DISPATCHED -> ${message}`)
        }
    }
}