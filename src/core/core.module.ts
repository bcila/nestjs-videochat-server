import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import postgresConfig from '../config/postgres.config';
import mongoConfig from '../config/mongo.config';
import s3Config from '../config/s3.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig, getPostgresConfig } from './utils/database.util';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [postgresConfig, mongoConfig, s3Config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        getPostgresConfig(configService),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        getMongoConfig(configService),
    }),
  ],
})
export class CoreModule {}
