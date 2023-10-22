import { Client } from '../../../domain/entities/client.entity';

export interface ClientRepository {
  create(client: Client): Promise<Client>;
  findAll(): Promise<Client[]>;
  findById(id: string): Promise<Client>;
  findByEmail(email: string): Promise<Client>;
  findAllByName(name: string): Promise<Client[]>;
  delete(id: string): Promise<void>;
}
