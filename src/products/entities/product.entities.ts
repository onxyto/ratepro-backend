import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { Nutrition } from './nutrition.entities';
import { Ingredient } from './ingredient.entities';
import { ProductTypeEnum } from 'src/shared/enums/product-type.enum';

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

  @Column({ type: 'enum', enum: ProductTypeEnum, default: ProductTypeEnum.NONE })
  type: ProductTypeEnum;

  @OneToMany(() => Nutrition, (nutrition) => nutrition.product, { cascade: true }) // OneToMany relationship with Nutrition
  nutritions: Nutrition[];

  @OneToMany(() => Ingredient, (ingredient) => ingredient.product, { cascade: true }) // OneToMany relationship with Ingredient
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
