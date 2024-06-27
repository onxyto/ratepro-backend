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
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDetailsDto } from './dtos/product-details.dto';
import { ProductListDto } from './dtos/product-list.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { UserRolesEnum } from 'src/shared/enums/user-roles.enum';
import { CurrentUserInterceptor } from 'src/shared/interceptors/current-user.interceptor';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';

@Controller('products')
@UseInterceptors(CurrentUserInterceptor)
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

  @Post(':id/favorites')
  @Auth(UserRolesEnum.USER) // Only authenticated users can add favorites
  async addToFavorites(
    @Param('id') productId: string,
    @CurrentUser('email') userEmail: string,
  ): Promise<void> {
    try {
      await this.productsService.addProductToFavorite(productId, userEmail);
      return;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id/favorites')
  @Auth(UserRolesEnum.USER) // Only authenticated users can add favorites
  async deleteFromFavorite(
    @Param('id') productId: string,
    @CurrentUser('email') userEmail: string,
  ): Promise<void> {
    try {
      await this.productsService.deleteProductFromFavorite(productId, userEmail);
      return;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':id/blacklist')
  @Auth(UserRolesEnum.USER) // Only authenticated users can add favorites
  async addToBlacklist(
    @Param('id') productId: string,
    @CurrentUser('email') userEmail: string,
  ): Promise<void> {
    try {
      await this.productsService.addProductToBlacklist(productId, userEmail);
      return;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id/blacklist')
  @Auth(UserRolesEnum.USER) // Only authenticated users can add favorites
  async deleteFromBlacklist(
    @Param('id') productId: string,
    @CurrentUser('email') userEmail: string,
  ): Promise<void> {
    try {
      await this.productsService.deleteProductFromBlackList(productId, userEmail);
      return;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
