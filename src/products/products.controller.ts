import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDetailsDto } from './dtos/product-details.dto';
import { ProductListDto } from './dtos/product-list.dto';
import { CreateProductDto } from './dtos/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get(':id')
  findProductBy(@Param('id') id: string): Promise<ProductDetailsDto> {
    return this.productsService.getProductDetails(id);
  }

  @Get()
  findAllProducts(): Promise<ProductListDto[]> {
    return this.productsService.getAllProducts();
  }
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }
}
