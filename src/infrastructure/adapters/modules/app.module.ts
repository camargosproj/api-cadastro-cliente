import { Module } from '@nestjs/common';
import { FindAddress } from '../../../application/use-cases/address/find-address';
import { CreateClient } from '../../../application/use-cases/client/create-client';

import { ClientController } from '../controllers/client.controller';
import { CepModule } from './cep.module';

@Module({
  imports: [CepModule],
  controllers: [ClientController],
  providers: [CreateClient, FindAddress],
})
export class AppModule {}
