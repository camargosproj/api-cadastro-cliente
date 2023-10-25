import { Injectable } from '@nestjs/common';
import { ClientRepository } from '../../../interfaces/repositories/client/client.repository.interface';
import { DeleteOneClientsUseCase } from '../../../interfaces/use-cases/client/deleteone-client.interface';
import { ClientNotFoundError } from '../../erros/custom-erros';

@Injectable()
export class DeleteOneClient implements DeleteOneClientsUseCase {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(id: string): Promise<void> {
    const client = await this.clientRepository.findById(id);

    if (!client) throw new ClientNotFoundError();

    await this.clientRepository.delete(id);
  }
}
