import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/product.module';
import { ProductCategoriesModule } from './product-categories/product-categories.module';
import { AboutModule } from './about/about.module';
import { HomeModule } from './home/home.module';
import { BannerModule } from './banner/banner.module';
import { UploadModule } from './upload/upload.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Log4jsModule } from './libs/log4js/';
import { ArticlesModule } from './articles/article.module';
import { CustomersModule } from './customers/customer.module';
import { ArticleCategoriesModule } from './article-categories/article-categories.module';

const ENV = process.env.NODE_ENV;
console.info('env = ', ENV);
const dbInfo = {
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '',
};
if (ENV === 'prod') {
  dbInfo.host = '10.0.224.4';
  dbInfo.port = 25532 || 3306;
  dbInfo.username = 'root';
  dbInfo.password = '';
}
const { host, port, username, password } = dbInfo;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host,
      port,
      username,
      password,
      database: 'nest_cms_api',
      entities: [],
      autoLoadEntities: true,
      synchronize: false,
    }),
    UsersModule,
    ProductsModule,
    ProductCategoriesModule,
    AboutModule,
    HomeModule,
    BannerModule,
    UploadModule,
    AuthModule,
    ArticlesModule,
    ArticleCategoriesModule,
    CustomersModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    Log4jsModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
