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
    const clients = await this.clientModel
      .find()
      .select('id name email phone address')
      .exec();

    return clients;
  }

  async findById(id: string): Promise<Client> {
    const client = await this.clientModel.findById(id).exec();
    return client;
  }

  async findByEmail(email: string): Promise<Client> {
    const client = await this.clientModel.findOne({ email }).exec();

    return client;
  }

  async delete(id: string): Promise<void> {
    await this.clientModel.deleteOne({ _id: id }).exec();
  }

  async findAllByName(name: string): Promise<Client[]> {
    const clients = await this.clientModel
      .find({ name: { $regex: new RegExp(name, 'i') } })
      .exec();

    return clients;
  }
}
