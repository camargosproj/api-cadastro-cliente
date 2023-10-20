import { Client } from "../../../domain/entities/client.entity";

export interface CreateClientUseCase {
  execute(client: Client): Promise<Client>;
}
