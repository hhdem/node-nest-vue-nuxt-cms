import { ApiProperty } from '@nestjs/swagger';
export class FindArticleCategoriesDto {
  @ApiProperty({
    required: false,
  })
  keyword: string;

  @ApiProperty({
    required: false,
  })
  category: string;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}
