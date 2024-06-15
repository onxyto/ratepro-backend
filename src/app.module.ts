import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { BlacklistsModule } from './blacklists.module';
import { FavoritesModule } from './products/favorites.module';
import { HistorysModule } from './products/historys.module';
import { FoodsModule } from './products/foods.module';
import { connectionSourceValues } from './shared/utils/datasource';
@Module({
  imports: [
    TypeOrmModule.forRoot(connectionSourceValues as TypeOrmModuleOptions),
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
