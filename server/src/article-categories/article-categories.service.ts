import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CreateArticleCategoriesDto } from './dto/create-article-categories.dto';
import { ArticleCategories } from './article-categories.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Raw, In, Equal } from 'typeorm';
import { RemoveArticleCategoriesDto } from './dto/remove-article-categories.dto';

@Injectable()
export class ArticleCategoriesService {
  constructor(
    @InjectRepository(ArticleCategories)
    private articleCategoriesRepository: Repository<ArticleCategories>,
  ) {}

  // 增加
  async create(
    createArticleCategoriesDto: CreateArticleCategoriesDto,
  ): Promise<any> {
    const { createdAt } = createArticleCategoriesDto;
    createArticleCategoriesDto.createdAt = createdAt || new Date();
    createArticleCategoriesDto.updatedAt = new Date();

    delete createArticleCategoriesDto.id;

    return await this.articleCategoriesRepository.save(
      createArticleCategoriesDto,
    );
  }

  // 删除
  async delete(
    removeArticleCategoriesDto: RemoveArticleCategoriesDto,
  ): Promise<any> {
    const { ids } = removeArticleCategoriesDto;

    return this.articleCategoriesRepository.delete(ids);
  }

  // 更新
  async update(updateArticleCategoriesData): Promise<any> {
    const { id, updateArticleCategoriesDto } = updateArticleCategoriesData;
    updateArticleCategoriesDto.updatedAt = new Date();

    return await this.articleCategoriesRepository.update(
      id,
      updateArticleCategoriesDto,
    );
  }

  // 列表
  async findAll(query: any): Promise<any> {
    const { keyword, category, page = 1, limit = 100 } = query;
    const skip = (page - 1) * limit;

    let params = {
      skip,
      take: limit,
    };

    let whereParams = {};

    whereParams = Object.assign(whereParams, {
      status: Equal(true),
    });

    if (keyword) {
      whereParams = Object.assign(whereParams, {
        name: Like(`%${keyword}%`),
      });
    }

    if (category) {
      whereParams = Object.assign(whereParams, {
        category: In(category),
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

    const [data, total] = await this.articleCategoriesRepository.findAndCount(
      params,
    );

    return {
      total,
      data,
    };
  }

  // 根据ID查找
  async findOneById(id: string): Promise<any> {
    return this.articleCategoriesRepository
      .createQueryBuilder()
      .where([{ route: id }, { id }])
      .getOne();
  }

  // 数量
  async getCount() {
    return await this.articleCategoriesRepository.count();
  }
}
