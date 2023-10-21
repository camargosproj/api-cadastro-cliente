import { Body, Controller, Post } from '@nestjs/common';
import { FindAddress } from '../../../application/use-cases/address/find-address';
import { CreateClient } from '../../../application/use-cases/client/create-client';
import { CreateClientDto } from './dto/client.dto';

@Controller('clients')
export class ClientController {
  constructor(
    private readonly createClientUseCase: CreateClient,
    private readonly findAddressUseCase: FindAddress,
  ) {}

  @Post()
  async create(@Body() client: CreateClientDto) {
    const address = await this.findAddressUseCase.execute(client.cep);

    const response = await this.createClientUseCase.execute({
      name: client.name,
      email: client.email,
      phone: client.phone,
      address: address,
    });

    return response;
  }
}
