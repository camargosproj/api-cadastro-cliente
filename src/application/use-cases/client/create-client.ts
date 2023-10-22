import { Injectable } from '@nestjs/common';
import { Client } from '../../../domain/entities/client.entity';
import { ClientRepositoryImpl } from '../../../infrastructure/adapters/repositories/client/client.repository';
import { CreateClientUseCase } from '../../../interfaces/use-cases/client/create-client.interface';
import { ClientAlreadyExistsError } from '../../erros/custom-erros';

@Injectable()
export class CreateClient implements CreateClientUseCase {
  constructor(private readonly clientRepository: ClientRepositoryImpl) {}

  async execute(client: Client): Promise<Client> {
    // Verifica se o cliente já existe
    const clientExists = await this.clientRepository.findByEmail(client.email);
    if (clientExists) throw new ClientAlreadyExistsError();

    return await this.clientRepository.create(client);
  }
}
