import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  NotFoundException,
  HttpException,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDetailsDto } from './dtos/product-details.dto';
import { ProductListDto } from './dtos/product-list.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { UserRolesEnum } from 'src/shared/enums/user-roles.enum';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get(':id')
  findProductBy(@Param('id') id: string): Promise<ProductDetailsDto> {
    return this.productsService.getProductDetails(id);
  }

  @Get()
  @Auth(UserRolesEnum.USER, UserRolesEnum.ADMIN)
  findAllProducts(): Promise<ProductListDto[]> {
    return this.productsService.getAllProducts();
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Post('/bulk')
  createProducts(@Body() createProductDto: CreateProductDto[]) {
    return this.productsService.createProducts(createProductDto);
  }

  // @Post(':id/favorites')
  // @Auth(UserRolesEnum.USER) // Only authenticated users can add favorites
  // async addToFavorites(@Param('id') productId: string): Promise<void> {
  //   const user = await this.userService.getCurrentUser(); // Assuming a method to get current user

  //   if (!user) {
  //     throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
  //   }

  //   await this.userService.addToFavorites(user.id, productId);
  // }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<void> {
    try {
      const deleted = await this.productsService.deleteProduct(id);
      if (!deleted) {
        throw new NotFoundException('Product not found');
      }
      return;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Re-throw NotFoundException for specific handling
      } else {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
  }
}
