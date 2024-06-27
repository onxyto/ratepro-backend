import { Product } from 'src/products/entities/product.entities';
import { User } from 'src/user/entities/user.entities';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('history_products')
export class HistoryProduct {
  id: string;

  @PrimaryColumn({ name: 'user_id' })
  userId: string;

  @PrimaryColumn({ name: 'product_id' })
  productId: string;

  @ManyToOne(() => User, (user) => user.products, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  }) // ManyToOne relationship with User
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @ManyToOne(() => Product, (product) => product.users, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Product;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
