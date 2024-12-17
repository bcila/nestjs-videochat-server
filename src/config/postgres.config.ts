import { registerAs } from '@nestjs/config';

export default registerAs('postgres', () => ({
  type: 'postgres',
  host: process.env.POSTGRES_NEON_HOST,
  port: process.env.POSTGRES_NEON_PORT,
  username: process.env.POSTGRES_NEON_USERNAME,
  password: process.env.POSTGRES_NEON_PASSWORD,
  database: process.env.POSTGRES_NEON_DATABASE,
  synchronize: process.env.NODE_ENV !== 'production',
  ssl: true,
}));
