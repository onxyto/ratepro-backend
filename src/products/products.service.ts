import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDetailsDto } from './dtos/product-details.dto';
import { Product } from './entities/product.entities';
import { CreateProductDto } from './dtos/create-product.dto';
import { FavoriteProduct } from './entities/favorite-product.entities';
import { User } from '../user/entities/user.entities';
import { ProductMapper } from '../shared/mappers/product.mapper';
import { ProductListDto } from './dtos/product-list.dto';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(FavoriteProduct)
    private favoriteProductRepo: Repository<FavoriteProduct>,
  ) {}

  async getProductDetails(id: string): Promise<ProductDetailsDto | undefined> {
    try {
      // Fetch product with related nutritions using eager loading
      const product = await this.productRepo.findOne({
        where: { id },
        relations: ['nutritions', 'ingredients'],
      });

      // Check if product is found
      if (!product) {
        throw new NotFoundException('Product not found');
      }

      // Return product details (assuming ProductDetailsDto has necessary properties)
      return ProductMapper.mapToProductDetailsDto(product);
    } catch (error: any) {
      throw error; // Re-throw the error for handling at a higher level
    }
  }

  async searchProductByName(keyword: string): Promise<ProductDetailsDto | undefined> {
    try {
      // Fetch product with related nutritions using eager loading
      const product = await this.productRepo.findOne({
        where: { name: keyword },
        relations: ['nutritions', 'ingredients'],
      });

      // Check if product is found
      if (!product) {
        throw new NotFoundException('Product not found');
      }

      // Return product details (assuming ProductDetailsDto has necessary properties)
      return ProductMapper.mapToProductDetailsDto(product);
    } catch (error: any) {
      throw error; // Re-throw the error for handling at a higher level
    }
  }
  async getRecommendedProducts(): Promise<ProductListDto[]> {
    try {
      const products = await this.productRepo.find({
        where: { recommended: true },
      });
      if (!products) {
        return undefined;
      }
      return ProductMapper.mapToProductListDto(products);
    } catch (error: any) {
      throw error;
    }
  }

  async getAllProducts(): Promise<ProductListDto[]> {
    try {
      const products = await this.productRepo.find();

      if (!products) {
        return undefined;
      }

      return ProductMapper.mapToProductListDto(products);
    } catch (error: any) {
      throw error;
    }
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const product = this.productRepo.create(ProductMapper.mapToProduct(createProductDto));

      const productSaved = await this.productRepo.save(product);

      if (!productSaved) {
        return undefined;
      }

      return productSaved;
    } catch (error: any) {
      throw error;
    }
  }

  async createProducts(products: CreateProductDto[]): Promise<Product[]> {
    const createdProducts: Product[] = [];
    const manager = this.productRepo.manager;
    try {
      await manager.transaction(async (transactionalEntityManager) => {
        for (const productDto of products) {
          const mappedProduct = ProductMapper.mapToProduct(productDto);
          const createdProduct = await transactionalEntityManager.save(Product, mappedProduct);
          createdProducts.push(createdProduct);
        }
      });
    } catch (error) {
      // Handle transaction errors here
      console.error('Error creating products:', error); // Log the error for debugging
      throw new Error('An error occurred while creating products'); // Re-throw a generic error
    }
    return createdProducts;
  }

  async addProductToFavorite(productId: string, email: string): Promise<void> {
    const user = await this.userRepo.findOne({
      where: { email },
    });
    const product = await this.productRepo.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException();
    }
    const createFavoriteProduct = {
      user,
      product,
    };

    try {
      const productFavoriteSaved = await this.favoriteProductRepo.save(createFavoriteProduct);

      if (!productFavoriteSaved) {
        return undefined;
      }
    } catch (error: any) {
      throw error;
    }
  }

  async deleteProductFromFavorite(productId: string, email: string): Promise<void> {
    const user = await this.userRepo.findOne({
      where: { email },
    });
    const product = await this.productRepo.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException();
    }
    const deleteFavoriteProduct = {
      user,
      product,
    };
    try {
      const productFavoriteDeleted = await this.favoriteProductRepo.delete(deleteFavoriteProduct);

      if (!productFavoriteDeleted) {
        return undefined;
      }
    } catch (error: any) {
      throw error;
    }
  }

  async addProductToBlacklist(productId: string, email: string): Promise<void> {
    const user = await this.userRepo.findOne({
      where: { email },
    });
    const product = await this.productRepo.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException();
    }
    const createFavoriteProduct = {
      user,
      product,
    };

    try {
      const productFavoriteSaved = await this.favoriteProductRepo.save(createFavoriteProduct);

      if (!productFavoriteSaved) {
        return undefined;
      }
    } catch (error: any) {
      throw error;
    }
  }

  async deleteProductFromBlackList(productId: string, email: string): Promise<void> {
    const user = await this.userRepo.findOne({
      where: { email },
    });
    const product = await this.productRepo.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException();
    }
    const deleteFavoriteProduct = {
      user,
      product,
    };
    try {
      const productFavoriteDeleted = await this.favoriteProductRepo.delete(deleteFavoriteProduct);

      if (!productFavoriteDeleted) {
        return undefined;
      }
    } catch (error: any) {
      throw error;
    }
  }

  // async update(id: string, updateProductDto: any) {
  //   const product = await this.productRepo.findOneBy({ id });
  //   if (!product) {
  //     throw new NotFoundException();
  //   }
  //   Object.assign(product, updateProductDto);
  //   return await this.productRepo.save(product);
  // }

  async deleteProduct(id: string): Promise<boolean> {
    const result = await this.productRepo.delete(id);
    return result.affected > 0; // Check if any rows were affected (deleted)
  }

  // async remove(id: string) {
  //   const product = await this.productRepo.findOneBy({ id });
  //   if (!product) {
  //     throw new NotFoundException();
  //   }
  //   return await this.productRepo.remove(product);
  // }
}
