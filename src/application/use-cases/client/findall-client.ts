import { Injectable } from '@nestjs/common';
import { ClientRepositoryImpl } from '../../../infrastructure/adapters/repositories/client/client.repository';
import {
  ClientPaginated,
  FindAllClientsUseCase,
} from '../../../interfaces/use-cases/client/findall-client.interface';

@Injectable()
export class FindAllClients implements FindAllClientsUseCase {
  constructor(private readonly clientRepository: ClientRepositoryImpl) {}

  async execute(
    name?: string,
    limit?: number,
    offset?: number,
    basePath?: string,
  ): Promise<ClientPaginated> {
    const clients = await this.clientRepository.findAll(
      name,
      limit,
      offset,
      basePath,
    );
    return clients;
  }
}
