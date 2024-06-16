/* eslint-disable prettier/prettier */
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from '../products/dtos/create-product.dto';

import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private ProductsRepository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    // const product = this.ProductsRepository.create(createProductDto);
    console.log(createProductDto);
    const product =null;

    return await this.ProductsRepository.save(product);
  }
  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException();
    }
    Object.assign(product, updateProductDto);
    return await this.ProductsRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException();
    }
    return await this.ProductsRepository.remove(product);
  }

  findAll(): Promise<Product[]> {
    return this.ProductsRepository.find();
  }
  findOne(id: number): Promise<Product | null> {
    return this.ProductsRepository.findOneBy({ id });
  }
}
