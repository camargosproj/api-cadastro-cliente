import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from '../../../../domain/entities/client.entity';
import { ClientRepository } from '../../../../interfaces/repositories/client/client.repository.interface';
import { ClientModel } from '../../../mongo/models/client.model';

@Injectable()
export class ClientRepositoryImpl implements ClientRepository {
  constructor(
    @InjectModel(ClientModel.name) private clientModel: Model<ClientModel>,
  ) {}
  async create(client: Client): Promise<Client> {
    const createdClient = await this.clientModel.create(client);
    return createdClient;
  }

  async findAll(): Promise<Client[]> {
    const clients = await this.clientModel.find().exec();
    return clients;
  }
}
