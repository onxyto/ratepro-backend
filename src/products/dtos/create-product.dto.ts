import { ProductType } from 'src/shared/enums/product-type.enum';

export class CreateProductDto {
  ean: string;
  name: string;
  title: string;
  image_url: string;
  type: ProductType;
  description: string;
  storage_type: string;
  rating: number;
  recommended: boolean;
}
