import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ApiCepService } from '../services/cep/api-cep.service';
import { CepManager } from '../services/cep/cep-manager.service';
import { ViaCepService } from '../services/cep/via-cep.service';

@Module({
  imports: [HttpModule],
  providers: [ApiCepService, ViaCepService, CepManager],
  exports: [CepManager],
})
export class CepModule {}
