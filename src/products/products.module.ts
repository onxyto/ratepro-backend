/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Nutrition } from './entities/nutrition.entities';
import { Product } from './entities/product.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Nutrition])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
