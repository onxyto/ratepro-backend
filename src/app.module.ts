import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { connectionSourceValues } from './shared/utils/datasource';
import { ProductsModule } from './products/products.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { FirebaseAdmin } from 'firebase.setup';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserInterceptor } from './shared/interceptors/current-user.interceptor';
import { HistoryModule } from './history/history.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(connectionSourceValues as TypeOrmModuleOptions),
    ProductsModule,
    UserModule,
    HistoryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    FirebaseAdmin,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
})
export class AppModule {}
