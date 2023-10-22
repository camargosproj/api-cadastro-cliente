import { Client } from '../../../domain/entities/client.entity';
import { ClientPaginated } from '../../use-cases/client/findall-client.interface';

export interface ClientRepository {
  create(client: Client): Promise<Client>;
  findAll(
    name?: string,
    limit?: number,
    offset?: number,
    basePath?: string,
  ): Promise<ClientPaginated>;
  findById(id: string): Promise<Client>;
  findByEmail(email: string): Promise<Client>;
  delete(id: string): Promise<void>;
}
