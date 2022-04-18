import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RetrieveArticleCategoriesDto {
  @ApiProperty()
  @IsString()
  id: string;
}
