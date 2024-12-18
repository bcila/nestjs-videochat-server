import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { PostgresConfig } from '../../config/postgres.config';
import { MongoConfig } from '../../config/mongo.config';

export const databaseProviders = [
  {
    provide: 'POSTGRES_PROVIDER',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const pgConfig = configService.get<PostgresConfig>('postgres');
      const source: PostgresConnectionOptions = {
        type: pgConfig.type,
        host: pgConfig.host,
        port: pgConfig.port,
        username: pgConfig.username,
        password: pgConfig.password,
        database: pgConfig.database,
        synchronize: pgConfig.synchronize,
        ssl: pgConfig.ssl,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      };

      const dataSource = new DataSource(source);
      return dataSource.initialize();
    },
  },
  {
    provide: 'MONGO_PROVIDER',
    inject: [ConfigService],
    useFactory: async (
      configService: ConfigService,
    ): Promise<typeof mongoose> => {
      const mongoConfig = configService.get<MongoConfig>('mongo');
      const username = mongoConfig.username;
      const password = mongoConfig.password;
      const host = mongoConfig.host;
      const appName = mongoConfig.appName;

      const uri = configService
        .get('mongo.uri')
        .replace('<mongo_username>', username)
        .replace('<mongo_password>', password)
        .replace('<mongo_host>', host)
        .replace('<mongo_appName>', appName);

      return mongoose.connect(uri);
    },
  },
];
