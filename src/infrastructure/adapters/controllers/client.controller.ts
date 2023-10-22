import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { FindAddress } from '../../../application/use-cases/address/find-address';
import { CreateClient } from '../../../application/use-cases/client/create-client';
import { DeleteOneClient } from '../../../application/use-cases/client/deleteone-client';
import { FindAllClients } from '../../../application/use-cases/client/findall-client';
import { FindOneClient } from '../../../application/use-cases/client/findone-client';
import { CreateClientDto, FindAllQueryDto } from './dto/client.dto';

@Controller('clients')
export class ClientController {
  constructor(
    private readonly createClientUseCase: CreateClient,
    private readonly findAddressUseCase: FindAddress,
    private readonly findAllClientsUseCase: FindAllClients,
    private readonly findOneClientUseCase: FindOneClient,
    private readonly deleteOneClientUseCase: DeleteOneClient,
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

  @Get()
  async findAll(
    @Req() req: Request,
    @Query() { name, limit, offset }: FindAllQueryDto,
  ) {
    const basePath = `${req.protocol}://${req.get('host')}${req.baseUrl}${
      req.path
    }`;

    const response = await this.findAllClientsUseCase.execute(
      name,
      limit,
      offset,
      basePath,
    );
    return response;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const response = await this.findOneClientUseCase.execute(id);
    return response;
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    await this.deleteOneClientUseCase.execute(id);

    return { message: 'Client deleted successfully' };
  }
}
