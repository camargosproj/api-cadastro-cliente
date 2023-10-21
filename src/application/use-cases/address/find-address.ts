import { Injectable } from '@nestjs/common';
import { Address } from '../../../domain/entities/address.entity';
import { CepManager } from '../../../infrastructure/adapters/services/cep/cep-manager.service';
import { FindAddressUseCase } from '../../../interfaces/use-cases/address/find-address.interface';

@Injectable()
export class FindAddress implements FindAddressUseCase {
  constructor(private readonly cepService: CepManager) {}

  async execute(cep: string): Promise<Address> {
    return await this.cepService.getAddressByCep(cep);
  }
}
