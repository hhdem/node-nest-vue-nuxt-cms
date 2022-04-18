import { Module } from '@nestjs/common';
import { ArticleCategoriesService } from './article-categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleCategories } from './article-categories.entity';
import { ArticleCategoriesController } from './article-categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleCategories])],
  providers: [ArticleCategoriesService],
  exports: [ArticleCategoriesService],
  controllers: [ArticleCategoriesController],
})
export class ArticleCategoriesModule {}
