import { ApiProperty } from '@nestjs/swagger';
export class FindArticleDto {
  @ApiProperty({
    required: false,
  })
  keyword: string;

  @ApiProperty({
    required: false,
  })
  category: string;

  @ApiProperty({
    required: false,
  })
  outerId: string;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}
