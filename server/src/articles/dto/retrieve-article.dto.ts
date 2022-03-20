import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RetrieveArticleDto {
  @ApiProperty()
  @IsString()
  id: string;
}
