import { Client } from "../../domain/entities/client.entity";
import { CreateClientUseCase } from "../../interfaces/use-cases/client/create-client.interface";

export class CreateClient implements CreateClientUseCase {
  async execute(client: Client): Promise<Client> {
    throw new Error("Method not implemented.");
  }
}
