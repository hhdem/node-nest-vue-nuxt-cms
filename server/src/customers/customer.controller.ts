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
import { Customer } from './customer.entity';
import { CustomersService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { FindCustomerDto } from './dto/find-customer.dto';
import { RemoveCustomerDto } from './dto/remove-customer.dto';
import { RetrieveCustomerDto } from './dto/retrieve-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';


@ApiTags('文章')
@Controller('api/customers')
export class CustomersController {
    constructor(private readonly articlesService: CustomersService) {}


  // 增加
  // @UseGuards(JwtAuthGuardUser)
  @Post()
  @ApiOperation({ summary: '增加' })
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    console.info('createCustomerDto ==> ', createCustomerDto);
    return await this.articlesService.create(createCustomerDto);
  }

  // 删除
  @UseGuards(JwtAuthGuardUser)
  @Delete()
  @ApiOperation({ summary: '删除' })
  async remove(
    @Body() removeCustomerDto: RemoveCustomerDto,
    @Request() req,
  ): Promise<any> {
    Log({ req });
    return await this.articlesService.delete(removeCustomerDto);
  }

  // 更新
  @UseGuards(JwtAuthGuardUser)
  @Put(':id')
  @ApiOperation({ summary: '更新' })
  async update(
    @Param() params: RetrieveCustomerDto,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<any> {
    return await this.articlesService.update({
      id: params.id,
      updateCustomerDto,
    });
  }

  // 列表
  // @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: '列表' })
  async findAll(@Query() query: FindCustomerDto): Promise<Customer> {
    return await this.articlesService.findAll(query);
  }

  // 根据 id 查找
  @Get(':id')
  @ApiOperation({ summary: '根据 id 查找' })
  async findOneById(@Param() params: RetrieveCustomerDto): Promise<any> {
    return await this.articlesService.findOneById(params.id);
  }

  // 数量
  @Get('list/count')
  @ApiOperation({ summary: '文章数量' })
  async getCount() {
    return await this.articlesService.getCount();
  }
  
}