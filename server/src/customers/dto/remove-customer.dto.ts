import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RemoveCustomerDto {
  @ApiProperty()
  @IsArray()
  ids: [];
}
