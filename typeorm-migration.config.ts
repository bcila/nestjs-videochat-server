import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();
const configService = new ConfigService();
export default new DataSource({
  type: 'postgres',
  host: configService.getOrThrow('POSTGRES_NEON_HOST'),
  port: configService.getOrThrow('POSTGRES_NEON_PORT'),
  username: configService.getOrThrow('POSTGRES_NEON_USERNAME'),
  password: configService.getOrThrow('POSTGRES_NEON_PASSWORD'),
  database: configService.getOrThrow('POSTGRES_NEON_DATABASE'),
  entities: ['src/**/*.entity.ts'],
  migrations: ['migrations/**'],
  ssl: true,
  synchronize: true,
});
