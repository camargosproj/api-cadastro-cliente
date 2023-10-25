import { Client } from '../../../domain/entities/client.entity';
import { ClientPaginated } from '../../use-cases/client/findall-client.interface';

export abstract class ClientRepository {
  abstract create(client: Client): Promise<Client>;
  abstract findAll(
    name?: string,
    limit?: number,
    offset?: number,
    basePath?: string,
  ): Promise<ClientPaginated>;
  abstract findById(id: string): Promise<Client>;
  abstract findByEmail(email: string): Promise<Client>;
  abstract delete(id: string): Promise<void>;
}
