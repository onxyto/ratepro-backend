import { ProductType } from 'src/shared/enums/product-type.enum';

export interface ProductListDto {
  id: string;
  ean: string;
  name: string;
  title: string;
  image_url: string;
  rating: number;
  type: ProductType;
  recommended: boolean;
  deleted: boolean;
  created_at: Date;
  updated_at: Date;
}
