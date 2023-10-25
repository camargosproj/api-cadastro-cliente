import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CepService } from '../../../interfaces/services/cep-service.interface';
import { ApiCepService } from '../services/cep/api-cep.service';
import { CepManager } from '../services/cep/cep-manager.service';
import { ViaCepService } from '../services/cep/via-cep.service';

@Module({
  imports: [HttpModule],
  providers: [
    ApiCepService,
    ViaCepService,
    {
      provide: CepService,
      useClass: CepManager,
    },
  ],
  exports: [
    {
      provide: CepService,
      useClass: CepManager,
    },
  ],
})
export class CepModule {}
