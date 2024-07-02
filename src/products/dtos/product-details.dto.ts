import { ProductTypeEnum } from '../../shared/enums/product-type.enum';
import { NutritionDto } from '../../shared/dtos/nutrition.dto';
import { IngredientDto } from '../../shared/dtos/ingredient.dto';

export interface ProductDetailsDto {
  id: string;
  ean: string;
  name: string;
  title: string;
  image_url: string;
  rating: number;
  type: ProductTypeEnum;
  recommended: boolean;
  description: string;
  storage_type: string;
  nutritions: NutritionDto[];
  ingredients: IngredientDto[];
  deleted: boolean;
  created_at: Date;
  updated_at: Date;
}
