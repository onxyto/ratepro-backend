import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';
import { Product } from './entities/product.entity';
import { AddToFavoritesDto } from './dto/add-favorite.dto';
@Injectable()
export class FavoritesService {
  findAll(): Promise<Favorite[]> {
    return this.FavoriteRepository.find();
  }
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Favorite)
    private FavoriteRepository: Repository<Favorite>,
  ) {}

  async addToFavorites(dto: AddToFavoritesDto): Promise<void> {
    const { id } = dto;
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    const favorite = new Favorite();

    favorite.productame = product.productame;

    favorite.storageType = product.storageType;

    favorite.isActive = product.isActive;

    favorite.calories = product.calories;

    favorite.protein = product.protein;

    favorite.fat = product.fat;

    favorite.sodium = product.sodium;

    favorite.text = product.text;
    await this.FavoriteRepository.save(favorite);
  }
}
