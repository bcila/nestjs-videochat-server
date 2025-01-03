import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [CoreModule, AuthModule, UsersModule, UploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
