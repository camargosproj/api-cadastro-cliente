import { Client } from '../../../domain/entities/client.entity';

export interface FindOneClientsUseCase {
  execute(id: string): Promise<Client>;
}
