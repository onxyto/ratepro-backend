import { ProductTypeEnum } from 'src/shared/enums/product-type.enum';
import { NutritionDto } from './nutrition.dto';
import { IngredientDto } from './ingredient.dto';

export class CreateProductDto {
  ean: string;
  name: string;
  title: string;
  imageUrl: string;
  type: ProductTypeEnum;
  description: string;
  nutritions?: NutritionDto[];
  ingredients?: IngredientDto[];
  storageType: string;
  rating: number;
}
