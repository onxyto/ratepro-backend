import { Blacklist } from './products/entities/blacklist.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlacklistsService } from './products/blacklists.service';
import { BlacklistsController } from './products/blacklists.controller';
import { Product } from './products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blacklist, Product])],
  providers: [BlacklistsService],
  controllers: [BlacklistsController],
})
export class BlacklistsModule {}
