import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { Product } from 'src/products/entities/product.entities';
import { User } from 'src/user/entities/user.entities';
import { FirebaseAdmin } from 'firebase.setup';
import { HistoryProduct } from './entities/history-product.entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, Product, HistoryProduct])],
  controllers: [HistoryController],
  providers: [HistoryService, FirebaseAdmin],
})
export class HistoryModule {}
