import { ProductType } from 'src/shared/enums/product-type.enum';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { Nutrition } from './nutrition.entities';
import { Ingredient } from './ingredient.entities';

@Entity('products')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  ean: string;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  image_url: string;

  @Column({ type: 'bigint' }) // Use bigint for larger rating values if needed
  rating: number;

  @Column({ type: 'enum', enum: ProductType, default: ProductType.NONE })
  type: ProductType;

  @OneToMany(() => Nutrition, (nutrition) => nutrition.product) // OneToMany relationship with Nutrition
  nutritions: Nutrition[];

  @OneToMany(() => Ingredient, (ingredient) => ingredient.product) // OneToMany relationship with Ingredient
  ingredients: Ingredient[];

  @Column()
  description: string;

  @Column()
  storage_type: string;

  @Column()
  recommended: boolean;

  @Column()
  deleted: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
