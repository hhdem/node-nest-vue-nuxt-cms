import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RetrieveCustomerDto {
  @ApiProperty()
  @IsString()
  id: string;
}
