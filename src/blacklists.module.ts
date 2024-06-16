import { Blacklist } from './productsv/entities/blacklist.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlacklistsService } from './productsv/blacklists.service';
import { BlacklistsController } from './productsv/blacklists.controller';
import { Product } from './productsv/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blacklist, Product])],
  providers: [BlacklistsService],
  controllers: [BlacklistsController],
})
export class BlacklistsModule {}
