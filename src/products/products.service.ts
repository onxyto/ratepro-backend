import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDetailsDto } from './dtos/product-details.dto';
import { ProductMapper } from 'src/shared/mappers/product.mapper';
import { Product } from './entities/product.entities';
import { CreateProductDto } from './dtos/create-product.dto';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
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
        return undefined; // Return undefined if product doesn't exist
      }

      // Return product details (assuming ProductDetailsDto has necessary properties)
      return ProductMapper.mapToProductDetailsDto(product);
    } catch (error: any) {
      throw error; // Re-throw the error for handling at a higher level
    }
  }

  async getAllProducts() {
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

  async update(id: string, updateProductDto: any) {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException();
    }
    Object.assign(product, updateProductDto);
    return await this.productRepo.save(product);
  }

  async deleteProduct(id: string): Promise<boolean> {
    const result = await this.productRepo.delete(id);
    return result.affected > 0; // Check if any rows were affected (deleted)
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException();
    }
    return await this.productRepo.remove(product);
  }

  findOne(id: string): Promise<Product | null> {
    return this.productRepo.findOneBy({ id });
  }
}
