import { Client } from "../../domain/entities/client.entity";
import { ClientRepository } from "../../interfaces/repositories/client/client.repository.interface";
import { CreateClientUseCase } from "../../interfaces/use-cases/client/create-client.interface";

export class CreateClient implements CreateClientUseCase {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(client: Client): Promise<Client> {
    return await this.clientRepository.create(client);
  }
}
