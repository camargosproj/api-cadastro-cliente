import { Address } from '../../domain/entities/address.entity';

export interface CepService {
  getAddressByCep(cep: string): Promise<Address>;
}
