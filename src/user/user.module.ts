import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { FirebaseAdmin } from '../../firebase.setup';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entities';
import { FavoriteProduct } from './entities/favorite-product.entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, FavoriteProduct])],
  controllers: [UserController],
  providers: [UserService, FirebaseAdmin],
})
export class UserModule {}
