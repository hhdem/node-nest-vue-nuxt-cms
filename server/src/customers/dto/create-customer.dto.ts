import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
export class CreateCustomerDto {
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()

  showname: string;

  @ApiProperty()
  mobile: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  wx: string;

  @ApiProperty()
  qq: string;

  @ApiProperty()
  note: string;

  @ApiProperty()
  @IsBoolean()
  status: boolean;

  @ApiProperty()
  createdAt: Date;

  updatedAt: Date;
}
