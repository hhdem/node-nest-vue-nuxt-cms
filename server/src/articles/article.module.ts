import { Module } from '@nestjs/common';
import { ArticlesService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { ArticlesController } from './article.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  providers: [ArticlesService],
  exports: [ArticlesService],
  controllers: [ArticlesController],
})
export class ArticlesModule {}
