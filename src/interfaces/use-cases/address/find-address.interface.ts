import { Address } from '../../../domain/entities/address.entity';

export interface FindAddressUseCase {
  execute(cep: string): Promise<Address>;
}
