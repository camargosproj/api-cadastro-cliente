import { Injectable } from '@nestjs/common';
import { Address } from '../../../domain/entities/address.entity';
import { CacheService } from '../../../interfaces/services/cache-service.interface';
import { CepService } from '../../../interfaces/services/cep-service.interface';
import { FindAddressUseCase } from '../../../interfaces/use-cases/address/find-address.interface';
import { AddressNotFoundError } from '../../erros/custom-erros';

@Injectable()
export class FindAddress implements FindAddressUseCase {
  constructor(
    private readonly cepService: CepService,
    private readonly cacheService: CacheService,
  ) {}

  async execute(cep: string): Promise<Address> {
    const cachedAddress = await this.cacheService.get<Address>(cep);

    if (cachedAddress) {
      return cachedAddress;
    }

    const address = await this.cepService.getAddressByCep(cep);

    if (!address) {
      throw new AddressNotFoundError();
    }

    await this.cacheService.set(cep, address);

    return address;
  }
}
