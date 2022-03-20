import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RemoveArticleDto {
  @ApiProperty()
  @IsArray()
  ids: [];
}
