import { Injectable } from '@nestjs/common';
import { Client } from '../../../domain/entities/client.entity';
import { ClientRepositoryImpl } from '../../../infrastructure/adapters/repositories/client/client.repository';
import { FindOneClientsUseCase } from '../../../interfaces/use-cases/client/findone-client.interface';
import { ClientNotFoundError } from '../../erros/custom-erros';

@Injectable()
export class FindOneClient implements FindOneClientsUseCase {
  constructor(private readonly clientRepository: ClientRepositoryImpl) {}

  async execute(id: string): Promise<Client> {
    const clients = await this.clientRepository.findById(id);

    if (!clients) throw new ClientNotFoundError();

    return clients;
  }
}
