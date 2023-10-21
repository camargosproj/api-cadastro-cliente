import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CepNotFoundError } from '../../../../application/erros/custom-erros';
import { Address } from '../../../../domain/entities/address.entity';
import { CepService } from '../../../../interfaces/services/cep-service.interface';

type ApiCepResponse = {
  code: string;
  state: string;
  city: string;
  district: string;
  address: string;
  status: number;
  ok: boolean;
  statusText: string;
};

@Injectable()
export class ApiCepService implements CepService {
  constructor(private readonly httpService: HttpService) {}

  async getAddressByCep(cep: string): Promise<Address> {
    try {
      const cepFormatted = cep.replace(/^([\d]{5})-*([\d]{3})/, '$1-$2');

      const url = `https://cdn.apicep.com/file/apicep/${cepFormatted}.json`;

      const { data } = await this.httpService.axiosRef.get<ApiCepResponse>(url);

      return {
        cep: data.code,
        state: data.state,
        city: data.city,
        neighborhood: data.district,
        street: data.address,
      };
    } catch (error) {
      throw new CepNotFoundError();
    }
  }
}
