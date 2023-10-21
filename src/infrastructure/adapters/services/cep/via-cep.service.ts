import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Address } from '../../../../domain/entities/address.entity';
import { CepService } from '../../../../interfaces/services/cep-service.interface';

export type ViaCepResponse = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
};

export type ViaCepErrorResponse = {
  erro: boolean;
};

@Injectable()
export class ViaCepService implements CepService {
  constructor(private readonly httpService: HttpService) {}

  async getAddressByCep(cep: string): Promise<Address> {
    try {
      const url = `https://viacep.com.br/ws/${cep}/json/`;

      const { data } = await this.httpService.axiosRef.get<
        ViaCepResponse | ViaCepErrorResponse
      >(url);

      if ('erro' in data) {
        throw new HttpException('CEP not found', HttpStatus.NOT_FOUND);
      }

      return {
        cep: data.cep,
        state: data.uf,
        city: data.localidade,
        neighborhood: data.bairro,
        street: data.logradouro,
      };
    } catch (error) {
      throw new HttpException('CEP not found', HttpStatus.NOT_FOUND);
    }
  }
}
