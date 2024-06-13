import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class History {
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
}
