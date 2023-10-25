import { Address } from '../../domain/entities/address.entity';

export abstract class CepService {
  abstract getAddressByCep(cep: string): Promise<Address>;
}
