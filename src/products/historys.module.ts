import { History } from './entities/history.entity';
import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { HistorysController } from './historys.controller';
import { HistorysService } from './historys.service';
@Module({
  imports: [TypeOrmModule.forFeature([History])],
  controllers: [HistorysController],
  providers: [HistorysService],
})
export class HistorysModule {}
