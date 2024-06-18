import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entities';
import { NutritionNatureEnum } from 'src/shared/enums/nutrition-labels.enum';

@Entity('nutritions')
export class Nutrition extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 2, scale: 1 })
  quantity: number;

  @Column()
  symbol: string;

  @Column()
  rating: string;

  @Column()
  deleted: boolean;

  @ManyToOne(() => Product, (product) => product.nutritions) // ManyToOne relationship with Product
  product: Product;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
