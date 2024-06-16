import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  productame: string;
  @Column()
  storageType: string;
  @Column({ default: true })
  isActive: boolean;
  @Column()
  calories: string;
  @Column()
  protein: string;
  @Column()
  fat: string;
  @Column()
  sodium: string;
  @Column()
  text: string;
}
