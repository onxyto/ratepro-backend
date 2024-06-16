import { IngredientDto } from 'src/shared/dtos/ingredient.dto';
import { NutritionDto } from 'src/shared/dtos/nutrition.dto';
import { ProductType } from 'src/shared/enums/product-type.enum';

export interface ProductDetailsDto {
  id: string;
  ean: string;
  name: string;
  title: string;
  image_url: string;
  rating: number;
  type: ProductType;
  recommended: boolean;
  nutritions: NutritionDto[];
  ingredients: IngredientDto[];
  deleted: boolean;
  created_at: Date;
  updated_at: Date;
}
