import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Matches,
  Validate,
} from 'class-validator';
import { IsBrazilianPhone } from '../../decorators/is-brazilian-phone.decorator';
export class CreateClientDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Validate(IsBrazilianPhone)
  @IsNumberString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  @IsNumberString()
  @Matches(/^[0-9]{8}$/, {
    message: 'cep must be a valid Brazilian CEP',
  })
  cep: string;
}