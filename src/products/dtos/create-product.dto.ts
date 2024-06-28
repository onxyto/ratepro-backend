
import { NutritionDto } from './nutrition.dto';
import { IngredientDto } from './ingredient.dto';
import {ProductTypeEnum} from "../../shared/enums/product-type.enum";

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
