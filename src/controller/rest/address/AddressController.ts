import {ControllerOptions, FSController} from "../FSController";
import {FSControllerRequest} from "../FSControllerRequest";
import {FSControllerResponse} from "../FSControllerResponse";
import {AddressTypeOrmRepository} from "../../../repository/typeOrm/address/AddressTypeOrmRepository";
import {CreateAddressUseCase} from "../../../useCase/address/CreateAddressUseCase";
import {AddressOrmDTO} from "../../../dto/general/AddressOrmDTO";
import {AddressDataClass} from "../../../dto/general/dataClass/AddressDataClass";
import {AddressEntity} from "../../../entity/AddressEntity";

export class AddressController extends FSController {

    constructor(request: FSControllerRequest, options?: ControllerOptions) {
        super(request, options)
    }

    async createAddress(): Promise<FSControllerResponse> {
        const addressPayload = this.request.body
        const addressDTO = new AddressOrmDTO(addressPayload, AddressDataClass, AddressEntity);
        const addressRepository = new AddressTypeOrmRepository(this.appDataSource);
        const createAddressUseCase = new CreateAddressUseCase(addressRepository, this.messageDispatcher);
        try {
            const createdAddressDTO = await createAddressUseCase.execute(addressDTO);
            const plainObjectCreatedAddress = createdAddressDTO.validatedData;
            this.response.status = 201;
            this.response.data = plainObjectCreatedAddress;
        } catch (error) {
            this.response.status = 500;
            this.response.data = {'detail': 'Internal server error.'};
        }
        return this.response;
    }
}