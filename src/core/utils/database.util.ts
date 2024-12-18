import { ConfigService } from '@nestjs/config';
import { PostgresConfig } from '../../config/postgres.config';
import { MongoConfig } from '../../config/mongo.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getPostgresConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const pgConfig = configService.get<PostgresConfig>('postgres');
  return {
    type: pgConfig.type,
    host: pgConfig.host,
    port: pgConfig.port,
    username: pgConfig.username,
    password: pgConfig.password,
    database: pgConfig.database,
    synchronize: pgConfig.synchronize,
    ssl: pgConfig.ssl,
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  };
};

export const getMongoConfig = (
  configService: ConfigService,
): MongooseModuleOptions => {
  const mongoConfig = configService.get<MongoConfig>('mongo');
  return { uri: mongoConfig.uri };
};
