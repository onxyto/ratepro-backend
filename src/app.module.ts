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
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '0000',
      database: 'test',
      entities: [Product, Blacklist, Favorite],
      synchronize: true,
    }),
    BlacklistsModule,
    FavoritesModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
