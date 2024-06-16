import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { NutritionLabels } from 'src/shared/enums/nutrition-labels.enum';
import { Product } from './product.entities';

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

  // TODO: USE WHEN INSERTING A NUTRITION FOR A PRODUCT
  public getRatingDescription(): string {
    switch (this.name) {
      case NutritionLabels.PROTEIN:
        if (this.quantity < 8) {
          return 'Low amount of protein';
        } else if (this.quantity < 13) {
          return 'Good amount of protein';
        } else {
          return 'Excellent amount of protein';
        }
      case NutritionLabels.ADDITIVES:
        if (this.quantity === 0) {
          return 'No hazardous substances';
        } else {
          return 'Contains additives to avoid';
        }
      case NutritionLabels.CALORIES:
        if (this.quantity >= 280) {
          return 'Too caloric';
        } else if (this.quantity >= 180) {
          return 'A bit too caloric';
        } else {
          return 'Low impact';
        }
      case NutritionLabels.SALT:
        if (this.quantity > 1.4) {
          return 'Too much sodium';
        } else if (this.quantity > 0.9) {
          return 'A bit too much sodium';
        } else {
          return 'Low sodium';
        }
      case NutritionLabels.SATURATED_FAT:
        if (this.quantity > 6) {
          return 'Too fatty';
        } else if (this.quantity > 4) {
          return 'A bit too fatty';
        } else {
          return 'Low fat';
        }
      case NutritionLabels.SUGAR:
        if (this.quantity > 7) {
          return 'Too sweet';
        } else if (this.quantity > 4) {
          return 'Low impact';
        } else {
          return 'No sugar';
        }
      default:
        return '';
    }
  }
}
