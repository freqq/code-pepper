import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { config } from 'dotenv';

config();

export const dataSource: PostgresConnectionOptions = {
  type: 'postgres',
  synchronize: false,
  logging: false,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [`${__dirname}/../**/*.entity.ts`],
  migrations: [`${__dirname}/../migrations/*.ts`],
  migrationsTransactionMode: 'each',
};

export default new DataSource(dataSource);
