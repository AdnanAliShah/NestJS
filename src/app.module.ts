import { NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './logger/logger.middleware';

import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [AuthModule, ConfigModule.forRoot(), UserModule, BookmarkModule, ProductModule],
  controllers : [AuthController],
  providers: [AuthService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
