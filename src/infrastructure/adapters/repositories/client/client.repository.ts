import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from '../../../../domain/entities/client.entity';
import { ClientRepository } from '../../../../interfaces/repositories/client/client.repository.interface';
import { ClientPaginated } from '../../../../interfaces/use-cases/client/findall-client.interface';
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

  async findAll(
    name: string,
    limit: number,
    offset: number,
    basePath: string,
  ): Promise<ClientPaginated> {
    const perPage = limit || 10;

    const currentPage = Math.floor(offset / perPage) + 1;

    const clients = await this.clientModel
      .find({ name: { $regex: new RegExp(name, 'i') } })
      .skip(offset)
      .limit(perPage)
      .select('id name')
      .exec();

    const totalItems = await this.clientModel.countDocuments().exec();
    const totalPages = Math.ceil(totalItems / perPage);

    const previousPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;
    return {
      count: clients.length,
      previous: previousPage
        ? `${basePath}?limit=${perPage}&offset=${(previousPage - 1) * perPage}`
        : null,
      next: nextPage
        ? `${basePath}?limit=${perPage}&offset=${(nextPage - 1) * perPage}`
        : null,
      results: clients.map((client) => ({
        id: client._id.toString(),
        name: client.name,
      })),
    };
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
}
