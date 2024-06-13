import { FavoritesService } from './favorites.service';
import { Controller, Post, Get, Body } from '@nestjs/common';
import { AddToFavoritesDto } from './dto/add-favorite.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  addToFavorites(@Body() dto: AddToFavoritesDto): Promise<void> {
    return this.favoritesService.addToFavorites(dto);
  }

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }
}
