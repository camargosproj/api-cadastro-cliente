import { Injectable } from '@nestjs/common';
import { ClientRepository } from '../../../interfaces/repositories/client/client.repository.interface';
import {
  ClientPaginated,
  FindAllClientsUseCase,
} from '../../../interfaces/use-cases/client/findall-client.interface';

@Injectable()
export class FindAllClients implements FindAllClientsUseCase {
  constructor(private readonly clientRepository: ClientRepository) {}

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
