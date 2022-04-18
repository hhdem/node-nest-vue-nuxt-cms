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
import { JwtAuthGuardUser } from 'src/auth/guards/jwt-auth.guard';
import { Log } from 'src/libs/utils';
import { Article } from './article.entity';
import { ArticlesService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { FindArticleDto } from './dto/find-article.dto';
import { RemoveArticleDto } from './dto/remove-article.dto';
import { RetrieveArticleDto } from './dto/retrieve-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';


@ApiTags('文章')
@Controller('api/articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) {}


  // 增加
  @UseGuards(JwtAuthGuardUser)
  @Post()
  @ApiOperation({ summary: '增加' })
  async create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
    return await this.articlesService.create(createArticleDto);
  }

  // 删除
  @UseGuards(JwtAuthGuardUser)
  @Delete()
  @ApiOperation({ summary: '删除' })
  async remove(
    @Body() removeArticleDto: RemoveArticleDto,
    @Request() req,
  ): Promise<any> {
    Log({ req });
    return await this.articlesService.delete(removeArticleDto);
  }

  // 更新
  @UseGuards(JwtAuthGuardUser)
  @Put(':id')
  @ApiOperation({ summary: '更新' })
  async update(
    @Param() params: RetrieveArticleDto,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<any> {
    return await this.articlesService.update({
      id: params.id,
      updateArticleDto,
    });
  }

  // 列表
  // @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: '列表' })
  async findAll(@Query() query: FindArticleDto): Promise<Article> {
    return await this.articlesService.findAll(query);
  }

  // 根据 id 查找
  @Get(':id')
  @ApiOperation({ summary: '根据 id 查找' })
  async findOneById(@Param() params: RetrieveArticleDto): Promise<any> {
    console.info('findOneById == ', params);
    var obj = await this.articlesService.findOneById(params.id);
    return obj;
  }

  // 根据 id 查找
  @Get('list/lastest')
  @ApiOperation({ summary: '获取最新列表' })
  async findLastest(@Query() query: FindArticleDto): Promise<Article> {
    console.info('lastest == ', query);
    return await this.articlesService.findAll({page:query.page, limit: query.limit, keyword: query.keyword, category:query.category, outerId: query.outerId});
  }

  // 数量
  @Get('list/count')
  @ApiOperation({ summary: '文章数量' })
  async getCount() {
    return await this.articlesService.getCount();
  }
  
}