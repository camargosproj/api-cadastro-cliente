import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import * as redisStore from 'cache-manager-redis-store';
import { FindAddress } from '../../../application/use-cases/address/find-address';
import { CreateClient } from '../../../application/use-cases/client/create-client';
import { DeleteOneClient } from '../../../application/use-cases/client/deleteone-client';
import { FindAllClients } from '../../../application/use-cases/client/findall-client';
import { FindOneClient } from '../../../application/use-cases/client/findone-client';
import { ClientModel, ClientSchema } from '../../mongo/models/client.model';
import { ClientController } from '../controllers/client.controller';
import { HttpExceptionFilter } from '../exception-filters/http-exception-filter';
import { ClientRepositoryImpl } from '../repositories/client/client.repository';
import { CacheService } from '../services/cache/cache.service';
import { CepModule } from './cep.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', {
      dbName: 'clients',
      auth: {
        username: 'root',
        password: 'root',
      },
    }),
    MongooseModule.forFeature([
      { name: ClientModel.name, schema: ClientSchema },
    ]),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    CepModule,
  ],
  controllers: [ClientController],
  providers: [
    CreateClient,
    FindAllClients,
    FindOneClient,
    FindAddress,
    DeleteOneClient,
    CacheService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    ClientRepositoryImpl,
  ],
})
export class AppModule {}
