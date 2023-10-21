import { Injectable } from '@nestjs/common';
import { Client } from '../../../domain/entities/client.entity';
import { ClientRepositoryImpl } from '../../../infrastructure/adapters/repositories/client/client.repository';
import { CreateClientUseCase } from '../../../interfaces/use-cases/client/create-client.interface';

@Injectable()
export class CreateClient implements CreateClientUseCase {
  constructor(private readonly clientRepository: ClientRepositoryImpl) {}

  async execute(client: Client): Promise<Client> {
    return await this.clientRepository.create(client);
  }
}
