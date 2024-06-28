import { Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { HistoryService } from './history.service';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { ProductListDto } from '../products/dtos/product-list.dto';
import { UserRolesEnum } from '../shared/enums/user-roles.enum';
import { Auth } from '../shared/decorators/auth.decorator';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get('/scan')
  async getUserScanHistory(@CurrentUser('email') userEmail: string): Promise<ProductListDto[]> {
    const products = await this.historyService.findUserScanHistory(userEmail);
    return products;
  }

  @Post(':ean/scan')
  @Auth(UserRolesEnum.USER)
  async addProductToHistory(
    @Param('ean') ean: string,
    @CurrentUser('email') userEmail: string,
  ): Promise<void> {
    try {
      await this.historyService.addScannedProductToHistory(ean, userEmail);
      return;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/clear')
  @Auth(UserRolesEnum.USER)
  async clearHistory(@CurrentUser('email') userEmail: string): Promise<void> {
    try {
      await this.historyService.clearHistoryProductsBy(userEmail);
      return;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @Auth(UserRolesEnum.USER)
  async deleteProductFromHistory(
    @Param('id') productId: string,
    @CurrentUser('email') userEmail: string,
  ): Promise<void> {
    try {
      await this.historyService.removeProductFromHistory(productId, userEmail);
      return;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
