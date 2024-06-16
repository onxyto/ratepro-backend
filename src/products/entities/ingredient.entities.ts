import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { Product } from './product.entities'; // Assuming your product entity is named 'product.entities'

@Entity('ingredients')
export class Ingredient extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  risk_rate: number; // Change to 'bigint' if needed

  @Column()
  health_risk: string;

  @Column()
  description: string;

  @Column()
  scientific_sources: string;

  @Column()
  deleted: boolean;

  @ManyToOne(() => Product, (product) => product.ingredients, { nullable: true })
  product: Product;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
