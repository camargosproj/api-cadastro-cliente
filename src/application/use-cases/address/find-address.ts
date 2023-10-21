import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Address } from '../../../domain/entities/address.entity';
import { CacheService } from '../../../infrastructure/adapters/services/cache/cache.service';
import { CepManager } from '../../../infrastructure/adapters/services/cep/cep-manager.service';
import { FindAddressUseCase } from '../../../interfaces/use-cases/address/find-address.interface';

@Injectable()
export class FindAddress implements FindAddressUseCase {
  constructor(
    private readonly cepService: CepManager,
    private readonly cacheService: CacheService,
  ) {}

  async execute(cep: string): Promise<Address> {
    const cachedAddress = await this.cacheService.get<Address>(cep);

    if (cachedAddress) {
      return cachedAddress;
    }

    const address = await this.cepService.getAddressByCep(cep);

    if (!address) {
      throw new HttpException('Address not found', HttpStatus.NOT_FOUND);
    }

    await this.cacheService.set(cep, address);

    return address;
  }
}
