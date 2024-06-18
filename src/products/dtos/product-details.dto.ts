import { IngredientDto } from 'src/shared/dtos/ingredient.dto';
import { NutritionDto } from 'src/shared/dtos/nutrition.dto';
import { ProductTypeEnum } from 'src/shared/enums/product-type.enum';

export interface ProductDetailsDto {
  id: string;
  ean: string;
  name: string;
  title: string;
  image_url: string;
  rating: number;
  type: ProductTypeEnum;
  recommended: boolean;
  nutritions: NutritionDto[];
  ingredients: IngredientDto[];
  deleted: boolean;
  created_at: Date;
  updated_at: Date;
}
