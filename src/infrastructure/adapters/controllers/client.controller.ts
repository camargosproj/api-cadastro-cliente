import { Body, Controller, Post } from '@nestjs/common';
import { CreateClient } from '../../../application/use-cases/create-client';
import { CreateClientDto } from './dto/client.dto';

@Controller('clients')
export class ClientController {
  constructor(private readonly createClientUseCase: CreateClient) {}

  @Post()
  async create(@Body() client: CreateClientDto) {
    return {
      message: 'Client created',
      data: client,
    };
  }
}
