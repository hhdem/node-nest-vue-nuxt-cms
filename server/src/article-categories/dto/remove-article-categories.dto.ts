import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RemoveArticleCategoriesDto {
  @ApiProperty()
  @IsArray()
  ids: [];
}
