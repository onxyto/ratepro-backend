import { Product } from 'src/products/entities/product.entities';

export interface HistoryListDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  product: Product;
}
