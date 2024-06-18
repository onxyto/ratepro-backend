import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Product } from 'src/products/entities/product.entities';
import { Ingredient } from 'src/products/entities/ingredient.entities';
import { Nutrition } from 'src/products/entities/nutrition.entities';

export const connectionSourceValues = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '    ',
  database: 'ratepro',
  logging: true,
  entities: [Product, Ingredient, Nutrition], // __dirname + '/../**/*.entities{.ts,.js}'
  migrations: [join(__dirname, '/../../', 'database/migrations/**/*{.ts,.js}')],
  synchronize: false,
  migrationsTableName: 'typeorm_migrations',
  migrationsRun: false,
  namingStrategy: new SnakeNamingStrategy(),
};

export const connectionSource = new DataSource(connectionSourceValues as DataSourceOptions);
