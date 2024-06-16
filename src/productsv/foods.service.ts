import { CreateFoodDto } from './dto/create-food.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Food } from './entities/food.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class FoodsService {
  constructor(
    @InjectRepository(Food)
    private FoodsRepository: Repository<Food>,
  ) {}
  async create(createFoodDto: CreateFoodDto) {
    const food = this.FoodsRepository.create(createFoodDto);
    return await this.FoodsRepository.save(food);
  }
  findAll(): Promise<Food[]> {
    return this.FoodsRepository.find();
  }
  findOne(id: number): Promise<Food | null> {
    return this.FoodsRepository.findOneBy({ id });
  }
  async remove(id: number) {
    const food = await this.findOne(id);
    if (!food) {
      throw new NotFoundException();
    }
    return await this.FoodsRepository.remove(food);
  }
}
