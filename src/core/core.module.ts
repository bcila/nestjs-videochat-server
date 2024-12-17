import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import postgresConfig from '../config/postgres.config';
import mongoConfig from '../config/mongo.config';
import s3Config from '../config/s3.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [postgresConfig, mongoConfig, s3Config],
    }),
  ],
})
export class CoreModule {}
