import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
export class UpdateCustomerDto {
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
  content: string;

  @ApiProperty()
  @IsBoolean()
  status: boolean;

  @ApiProperty()
  updatedAt: Date;
}
