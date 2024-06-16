import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { connectionSourceValues } from './shared/utils/datasource';
import { ProductsModule } from './products/products.module';
@Module({
  imports: [TypeOrmModule.forRoot(connectionSourceValues as TypeOrmModuleOptions), ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
