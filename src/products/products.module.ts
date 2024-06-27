/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Nutrition } from './entities/nutrition.entities';
import { Product } from './entities/product.entities';
import { FirebaseAdmin } from 'firebase.setup';
import { User } from 'src/user/entities/user.entities';
import { FavoriteProduct } from './entities/favorite-product.entities';
import { HistoryProduct } from 'src/history/entities/history-product.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Nutrition, User, FavoriteProduct, HistoryProduct])],
  controllers: [ProductsController],
  providers: [ProductsService, FirebaseAdmin],
})
export class ProductsModule {}
