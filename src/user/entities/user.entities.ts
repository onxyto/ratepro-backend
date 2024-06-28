
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { FavoriteProduct } from '../../products/entities/favorite-product.entities';
import {UserRolesEnum} from "../../shared/enums/user-roles.enum";
import {Product} from "../../products/entities/product.entities";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  firstName: string;

  @Column({ type: 'varchar', nullable: false })
  lastName: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  role: UserRolesEnum;

  @ManyToMany(() => FavoriteProduct, (favoriteProduct) => favoriteProduct.user) // ManyToMany relationship with FavoriteProduct
  @JoinTable({
    name: 'favorite_products',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
  }) // Join table configuration
  favorites?: FavoriteProduct[];

  @ManyToMany(() => Product, (product) => product.users) // ManyToMany relationship with FavoriteProduct
  @JoinTable({
    name: 'history_products',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
  }) // Join table configuration
  products?: Product[];

  @Column({ type: 'boolean', default: false })
  deleted: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
