import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Delete,
  Put,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateArticleCategoriesDto } from './dto/create-article-categories.dto';
import { ArticleCategoriesService } from './article-categories.service';
import { ArticleCategories } from './article-categories.entity';
import { RemoveArticleCategoriesDto } from './dto/remove-article-categories.dto';
import { RetrieveArticleCategoriesDto } from './dto/retrieve-article-categories.dto';
import { UpdateArticleCategoriesDto } from './dto/update-article-categories.dto';
import { FindArticleCategoriesDto } from './dto/find-article-categories.dto';
import { JwtAuthGuardUser } from 'src/auth/guards/jwt-auth.guard';

import { Log } from 'src/libs/utils';
@ApiTags('文章分类')
@Controller('api/article-categories')
export class ArticleCategoriesController {
  constructor(
    private readonly articleCategoriesService: ArticleCategoriesService,
  ) {}

  // 增加
  @UseGuards(JwtAuthGuardUser)
  @Post()
  @ApiOperation({ summary: '增加' })
  async create(
    @Body() createArticleCategoriesDto: CreateArticleCategoriesDto,
  ): Promise<ArticleCategories> {
    return await this.articleCategoriesService.create(
      createArticleCategoriesDto,
    );
  }

  // 删除
  @UseGuards(JwtAuthGuardUser)
  @Delete()
  @ApiOperation({ summary: '删除' })
  async remove(
    @Body() removeArticleCategoriesDto: RemoveArticleCategoriesDto,
    @Request() req,
  ): Promise<any> {
    Log({ req });
    return await this.articleCategoriesService.delete(
      removeArticleCategoriesDto,
    );
  }

  // 更新
  @UseGuards(JwtAuthGuardUser)
  @Put(':id')
  @ApiOperation({ summary: '更新' })
  async update(
    @Param() params: RetrieveArticleCategoriesDto,
    @Body() updateArticleCategoriesDto: UpdateArticleCategoriesDto,
  ): Promise<any> {
    return await this.articleCategoriesService.update({
      id: params.id,
      updateArticleCategoriesDto,
    });
  }

  // 列表
  // @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: '列表' })
  async findAll(
    @Query() query: FindArticleCategoriesDto,
  ): Promise<ArticleCategories> {
    return await this.articleCategoriesService.findAll(query);
  }

  // 根据 id 查找
  @Get(':id')
  @ApiOperation({ summary: '根据 id 查找' })
  async findOneById(
    @Param() params: RetrieveArticleCategoriesDto,
  ): Promise<any> {
    return await this.articleCategoriesService.findOneById(params.id);
  }

  // 数量
  @Get('list/count')
  @ApiOperation({ summary: '用户数量' })
  async getCount() {
    return await this.articleCategoriesService.getCount();
  }
}
