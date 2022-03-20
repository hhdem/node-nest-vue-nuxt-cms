import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Raw, In } from 'typeorm';
import { RemoveArticleDto } from './dto/remove-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
  ) {}

  // 增加
  async create(createArticleDto: CreateArticleDto): Promise<any> {
    const { createdAt } = createArticleDto;
    createArticleDto.createdAt = createdAt || new Date();
    createArticleDto.updatedAt = new Date();

    delete createArticleDto.id;

    return await this.articlesRepository.save(createArticleDto);
  }

  // 删除
  async delete(removeArticleDto: RemoveArticleDto): Promise<any> {
    const { ids } = removeArticleDto;

    return this.articlesRepository.delete(ids);
  }

  // 更新
  async update(updateArticleData): Promise<any> {
    const { id, updateArticleDto } = updateArticleData;
    updateArticleDto.updatedAt = new Date();

    return await this.articlesRepository.update(id, updateArticleDto);
  }

  // 列表
  async findAll(query: any): Promise<any> {
    const { keyword, category, page = 1, limit = 10, recommend } = query;
    const skip = (page - 1) * limit;

    let params = {
      skip,
      take: limit,
    };

    let whereParams = {};

    if (keyword) {
      whereParams = Object.assign(whereParams, {
        name: Like(`%${keyword}%`),
      });
    }

    if (category) {
      whereParams = Object.assign(whereParams, {
        category,
      });
    }

    if (recommend) {
      whereParams = Object.assign(whereParams, {
        recommend: recommend === 'true' ? true : '',
      });
    }

    params = Object.assign(
      params,
      {
        where: whereParams,
      },
      {
        order: {
          updatedAt: 'DESC',
        },
      },
    );

    const [data, total] = await this.articlesRepository.findAndCount(params);

    return {
      total,
      data,
    };
  }

  // 根据ID查找
  async findOneById(id: string): Promise<any> {
    return this.articlesRepository
      .createQueryBuilder()
      .where([{ route: id }, { id }])
      .getOne();
  }

  // 数量
  async getCount() {
    return await this.articlesRepository.count();
  }
}
