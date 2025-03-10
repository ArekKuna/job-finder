import { config as dotenvConfig } from 'dotenv';
import { DataSource } from 'typeorm';

dotenvConfig({ path: '.env.development' });

const devConfig = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrations: ['dist/migrations/db/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  synchronize: false,
});

export default devConfig;
