import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { FirebaseAdmin } from '../../firebase.setup';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entities';
import { HistoryProduct } from '../history/entities/history-product.entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, HistoryProduct])],
  controllers: [UserController],
  providers: [UserService, FirebaseAdmin],
})
export class UserModule {}
