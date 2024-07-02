import { ProductTypeEnum } from '../../shared/enums/product-type.enum';

export interface ProductListDto {
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
  deleted: boolean;
  created_at: Date;
  updated_at: Date;
}
