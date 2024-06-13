import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  img: string;
  @Column()
  title: string;
  @Column()
  name: string;
  @Column()
  time: string;
  @Column()
  rating: string;
  @Column()
  ratingClass: string;
  @Column()
  additives: string;
  @Column()
  pg: string;
  @Column()
  fat: string;
  @Column()
  sugar: string;
  @Column()
  calories: string;
  @Column()
  salt: string;
  @Column()
  Description: string;
  @Column()
  storage: string;
  @Column()
  recommendation: string;
  @Column()
  reminder: string;
}
