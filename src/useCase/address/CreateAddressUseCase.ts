import {BaseUseCase} from "../BaseUseCase";
import {BaseUseCaseInterface} from "../BaseUseCaseInterface";
import {AddressOrmDTO} from "../../dto/general/AddressOrmDTO";
import {AddressDataClass} from "../../dto/general/dataClass/AddressDataClass";
import {AddressEntity} from "../../entity/AddressEntity";
import {AddressTypeOrmRepository} from "../../repository/typeOrm/address/AddressTypeOrmRepository";


export class CreateAddressUseCase extends BaseUseCase implements BaseUseCaseInterface {
    protected repository: AddressTypeOrmRepository;

    constructor(repository: AddressTypeOrmRepository, messageDispatcher?) {
        super(repository, messageDispatcher);
    }
    async execute(addressDTO: AddressOrmDTO<AddressDataClass, AddressEntity>): Promise<AddressOrmDTO<AddressDataClass, AddressEntity>> {
        const createdAddress = await this.repository.create(addressDTO)
        const a = 1
        return createdAddress;
    }
}