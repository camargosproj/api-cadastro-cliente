import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import * as redisStore from 'cache-manager-redis-store';
import { FindAddress } from '../../../application/use-cases/address/find-address';
import { CreateClient } from '../../../application/use-cases/client/create-client';
import { ClientController } from '../controllers/client.controller';
import { HttpExceptionFilter } from '../exception-filters/http-exception-filter';
import { CacheService } from '../services/cache/cache.service';
import { CepModule } from './cep.module';

@Module({
  imports: [
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
    FindAddress,
    CacheService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
