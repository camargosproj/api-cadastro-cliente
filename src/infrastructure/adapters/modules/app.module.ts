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
import { config } from '../../../config/config';
import { ClientRepository } from '../../../interfaces/repositories/client/client.repository.interface';
import { CacheService } from '../../../interfaces/services/cache-service.interface';
import { ClientModel, ClientSchema } from '../../mongo/models/client.model';
import { ClientController } from '../controllers/client.controller';
import { HttpExceptionFilter } from '../exception-filters/http-exception-filter';
import { ClientRepositoryImpl } from '../repositories/client/client.repository';
import { CacheServiceImpl } from '../services/cache/cache.service';
import { CepModule } from './cep.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.database.uri, {
      dbName: config.database.name,
      auth: {
        username: config.database.user,
        password: config.database.password,
      },
    }),
    MongooseModule.forFeature([
      { name: ClientModel.name, schema: ClientSchema },
    ]),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: config.cache.host,
      port: config.cache.port,
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
    {
      provide: CacheService,
      useClass: CacheServiceImpl,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: ClientRepository,
      useClass: ClientRepositoryImpl,
    },
  ],
})
export class AppModule {}
