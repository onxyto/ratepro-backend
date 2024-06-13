import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { CreateFoodDto } from './dto/create-food.dto';
@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}
  @Post()
  create(@Body() createFoodDto: CreateFoodDto) {
    return this.foodsService.create(createFoodDto);
  }
  @Get()
  findAll() {
    return this.foodsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodsService.remove(+id);
  }
}
