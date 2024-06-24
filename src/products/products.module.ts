/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Nutrition } from './entities/nutrition.entities';
import { Product } from './entities/product.entities';
import { FirebaseAdmin } from 'firebase.setup';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Nutrition])],
  controllers: [ProductsController],
  providers: [ProductsService, FirebaseAdmin],
})
export class ProductsModule {}
