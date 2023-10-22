import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Matches,
  Validate,
} from 'class-validator';
import { Client } from '../../../../domain/entities/client.entity';
import { IsBrazilianPhone } from '../../decorators/is-brazilian-phone.decorator';
export class CreateClientDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Validate(IsBrazilianPhone)
  @IsNumberString()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsNumberString()
  @Matches(/^[0-9]{8}$/, {
    message: 'cep must be a valid Brazilian CEP',
  })
  cep: string;
}

export class FindAllQueryDto {
  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @ApiProperty({
    required: false,
  })
  @IsNumberString()
  @IsNotEmpty()
  @IsOptional()
  limit?: number;

  @ApiProperty({
    required: false,
  })
  @IsNumberString()
  @IsNotEmpty()
  @IsOptional()
  offset?: number;
}
export class AddressResponseDto {
  @ApiProperty()
  cep: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  neighborhood: string;

  @ApiProperty()
  state: string;
}

export class ClientResponseDto implements Client {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  address: AddressResponseDto;
}

export class ClientPaginatedResponseDto {
  @ApiProperty()
  count: number;

  @ApiProperty()
  previous: string;

  @ApiProperty()
  next: string;

  @ApiProperty({})
  results: ClientPaginatedDto[];
}

export class ClientPaginatedDto extends PickType(ClientResponseDto, [
  'id',
  'name',
]) {}
