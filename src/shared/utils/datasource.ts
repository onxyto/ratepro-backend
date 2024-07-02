import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Product } from '../../products/entities/product.entities';
import { Ingredient } from '../../products/entities/ingredient.entities';
import { Nutrition } from '../../products/entities/nutrition.entities';
import { User } from '../../user/entities/user.entities';
import { FavoriteProduct } from '../../products/entities/favorite-product.entities';
import { HistoryProduct } from '../../history/entities/history-product.entities';

const entities = [Product, Ingredient, Nutrition, User, FavoriteProduct, HistoryProduct];
export const connectionSourceValues = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '0000',
  database: 'tp',
  logging: true,
  entities: [...entities], // __dirname + '/../**/*.entities{.ts,.js}'
  migrations: [join(__dirname, '/../../', 'database/migrations/**/*{.ts,.js}')],
  synchronize: false,
  migrationsTableName: 'typeorm_migrations',
  migrationsRun: false,
  namingStrategy: new SnakeNamingStrategy(),
};

export const connectionSource = new DataSource(connectionSourceValues as DataSourceOptions);
