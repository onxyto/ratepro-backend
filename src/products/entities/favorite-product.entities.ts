
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entities';
import {Product} from "./product.entities";

@Entity('favorite_products')
export class FavoriteProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.favorites) // ManyToOne relationship with User
  user: User;

  @ManyToOne(() => Product, (product) => product.id) // ManyToOne relationship with Product (simplified)
  product: Product;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
