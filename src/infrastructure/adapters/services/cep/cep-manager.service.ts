import { Injectable } from '@nestjs/common';
import { Address } from '../../../../domain/entities/address.entity';
import { CepService } from '../../../../interfaces/services/cep-service.interface';
import { ApiCepService } from './api-cep.service';
import { ViaCepService } from './via-cep.service';

@Injectable()
export class CepManager implements CepService {
  constructor(
    private readonly viaCep: ViaCepService,
    private readonly apiCepService: ApiCepService,
  ) {}

  async getAddressByCep(cep: string): Promise<Address> {
    try {
      return await this.viaCep.getAddressByCep(cep);
    } catch (error) {
      return await this.apiCepService.getAddressByCep(cep);
    }
  }
}
