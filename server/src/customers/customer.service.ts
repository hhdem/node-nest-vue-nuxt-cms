import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Raw, In } from 'typeorm';
import { RemoveCustomerDto } from './dto/remove-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private articlesRepository: Repository<Customer>,
  ) {}

  // 增加
  async create(createCustomerDto: CreateCustomerDto): Promise<any> {
    const { createdAt } = createCustomerDto;
    createCustomerDto.createdAt = createdAt || new Date();
    createCustomerDto.updatedAt = new Date();
    createCustomerDto.status = true;
    delete createCustomerDto.id;

    return await this.articlesRepository.save(createCustomerDto);
  }

  // 删除
  async delete(removeCustomerDto: RemoveCustomerDto): Promise<any> {
    const { ids } = removeCustomerDto;

    return this.articlesRepository.delete(ids);
  }

  // 更新
  async update(updateCustomerData): Promise<any> {
    const { id, updateCustomerDto } = updateCustomerData;
    updateCustomerDto.updatedAt = new Date();

    return await this.articlesRepository.update(id, updateCustomerDto);
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
