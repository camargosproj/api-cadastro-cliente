import { Injectable } from '@nestjs/common';
import { Client } from '../../../domain/entities/client.entity';
import { ClientRepositoryImpl } from '../../../infrastructure/adapters/repositories/client/client.repository';
import { FindAllClientsUseCase } from '../../../interfaces/use-cases/client/findall-client.interface';

@Injectable()
export class FindAllClients implements FindAllClientsUseCase {
  constructor(private readonly clientRepository: ClientRepositoryImpl) {}

  async execute(name?: string): Promise<Client[]> {
    if (name) {
      const clients = await this.clientRepository.findAllByName(name);
      return clients;
    }

    const clients = await this.clientRepository.findAll();
    return clients;
  }
}
