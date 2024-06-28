import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoryProduct } from './entities/history-product.entities';
import { ProductMapper } from 'src/shared/mappers/product.mapper';
import { User } from '../user/entities/user.entities';
import { Product } from '../products/entities/product.entities';
import { ProductListDto } from '../products/dtos/product-list.dto';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    @InjectRepository(HistoryProduct)
    private historyProductRepo: Repository<HistoryProduct>,
  ) {}

  async addScannedProductToHistory(ean: string, userEmail: string): Promise<void> {
    const product = await this.productRepo.findOne({
      where: { ean },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    const user = await this.userRepo.findOne({
      where: { email: userEmail },
    });

    const existingHistory = await this.historyProductRepo.findOne({
      where: { userId: user.id, productId: product.id }, // Check for existing history for user and product
    });

    try {
      if (existingHistory) {
        existingHistory.updatedAt = new Date(); // Update updatedAt for existing entry
        await this.historyProductRepo.save(existingHistory); // Save the updated history
      } else {
        const createHistory = {
          userId: user.id,
          productId: product.id,
        };

        const productHistorySaved = await this.historyProductRepo.save(createHistory);
        if (!productHistorySaved) {
          return undefined;
        }
      }
    } catch (error: any) {
      throw error;
    }
  }

  async findUserScanHistory(userEmail: string): Promise<ProductListDto[]> {
    const user = await this.userRepo.findOne({
      where: { email: userEmail },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const historyProducts = await this.historyProductRepo.find({
      where: { userId: user.id }, // User ID might be the primary key now
    });

    // Extract product IDs or use a mapper to transform the objects
    const productIds = historyProducts.map((historyProduct) => historyProduct.productId);

    // Fetch the actual product details using the product IDs
    const products = await this.productRepo.findByIds(productIds as string[]);

    return ProductMapper.mapToProductListDto(products); // Or return the transformed product objects
  }

  async removeProductFromHistory(productId: string, userEmail: string): Promise<void> {
    const user = await this.userRepo.findOne({
      where: { email: userEmail },
    });

    if (!user) {
      throw new Error('User not found');
    }
    const product = await this.productRepo.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException();
    }
    const deleteHistoryProduct = {
      user,
      product,
    };

    try {
      const productFavoriteDeleted = await this.historyProductRepo.delete(deleteHistoryProduct);

      if (!productFavoriteDeleted) {
        return undefined;
      }
    } catch (error: any) {
      throw error;
    }
  }

  async clearHistoryProductsBy(userEmail: string): Promise<void> {
    const user = await this.userRepo.findOne({
      where: { email: userEmail },
    });

    if (!user) {
      throw new Error('User not found');
    }

    try {
      // Delete history products using user relation
      await this.historyProductRepo.delete({ user });
    } catch (error: any) {
      throw error;
    }
  }
}
