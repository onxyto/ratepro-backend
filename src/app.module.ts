import { Blacklist } from './products/entities/blacklist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Product } from './products/entities/product.entity';
import { ProductsModule } from './products/products.module';
import { BlacklistsModule } from './blacklists.module';
import { Favorite } from './products/entities/favorite.entity';
import { FavoritesModule } from './products/favorites.module';
import { History } from './products/entities/history.entity';
import { HistorysModule } from './products/historys.module';
import { Food } from './products/entities/food.entity';
import { FoodsModule } from './products/foods.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '0000',
      database: 'test',
      entities: [Product, Blacklist, Favorite, History, Food],
      synchronize: true,
    }),
    BlacklistsModule,
    FavoritesModule,
    ProductsModule,
    HistorysModule,
    FoodsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
