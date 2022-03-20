import { Module } from '@nestjs/common';
import { CustomersService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { CustomersController } from './customer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [CustomersService],
  exports: [CustomersService],
  controllers: [CustomersController],
})
export class CustomersModule {}
