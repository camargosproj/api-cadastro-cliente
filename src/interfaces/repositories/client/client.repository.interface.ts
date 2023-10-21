import { Client } from "../../../domain/entities/client.entity";

export interface ClientRepository {
  create(client: Client): Promise<Client>;
}
