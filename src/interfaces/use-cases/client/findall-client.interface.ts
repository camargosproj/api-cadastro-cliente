import { Client } from '../../../domain/entities/client.entity';

export interface FindAllClientsUseCase {
  execute(name: string): Promise<Client[]>;
}
