import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { FirebaseAdmin } from 'firebase.setup';
import { HistoryProduct } from './entities/history-product.entities';
import {User} from "../user/entities/user.entities";
import {Product} from "../products/entities/product.entities";

@Module({
  imports: [TypeOrmModule.forFeature([User, Product, HistoryProduct])],
  controllers: [HistoryController],
  providers: [HistoryService, FirebaseAdmin],
})
export class HistoryModule {}
