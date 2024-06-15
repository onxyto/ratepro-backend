import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';

export const connectionSourceValues = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '    ',
  database: 'ratepro',
  logging: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [join(__dirname, '/../../', 'database/migrations/**/*{.ts,.js}')],
  synchronize: false,
  migrationsTableName: 'typeorm_migrations',
  migrationsRun: false,
};

export const connectionSource = new DataSource(connectionSourceValues as DataSourceOptions);
