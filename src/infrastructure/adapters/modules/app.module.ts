import { Module } from '@nestjs/common';
import { CreateClient } from '../../../application/use-cases/create-client';
import { ClientController } from '../controllers/client.controller';

@Module({
  imports: [],
  controllers: [ClientController],
  providers: [CreateClient],
})
export class AppModule {}
