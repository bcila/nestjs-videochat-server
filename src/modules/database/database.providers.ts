import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const databaseProviders = [
  {
    provide: 'POSTGRES_PROVIDER',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const source: PostgresConnectionOptions = {
        type: configService.get<'postgres'>('postgres.type'),
        host: configService.get<string>('postgres.host'),
        port: configService.get<number>('postgres.port'),
        username: configService.get<string>('postgres.username'),
        password: configService.get<string>('postgres.password'),
        database: configService.get<string>('postgres.database'),
        synchronize: configService.get<boolean>('postgres.synchronize'),
        ssl: configService.get<boolean>('postgres.ssl'),
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
      const username = configService.get<string>('mongo.username');
      const password = configService.get<string>('mongo.password');
      const host = configService.get<string>('mongo.host');
      const appName = configService.get<string>('mongo.appName');

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
