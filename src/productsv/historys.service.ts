import { CreateHistoryDto } from './dto/create-history.dto';
import { Injectable } from '@nestjs/common';
import { History } from './entities/history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HistorysService {
  constructor(
    @InjectRepository(History)
    private HistorysRepository: Repository<History>,
  ) {}
  async create(createHistoryDto: CreateHistoryDto) {
    const history = this.HistorysRepository.create(createHistoryDto);
    return await this.HistorysRepository.save(history);
  }
  findAll(): Promise<History[]> {
    return this.HistorysRepository.find();
  }
  findOne(id: number): Promise<History | null> {
    return this.HistorysRepository.findOneBy({ id });
  }
  // async searchByName(title: string): Promise<History[]> {
  //   return this.HistorysRepository.find({ where: { name: Like(`%${title}%`) } });
  // }
}
