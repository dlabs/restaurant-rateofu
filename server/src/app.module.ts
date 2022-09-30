import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { JwtMiddleware } from 'middlewares/auth.middleware';
import { DatabaseModule } from 'modules/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { OrderModule } from 'modules/order/order.module';
import { OrderitemModule } from 'modules/orderitem/orderitem.module';
import { MenuitemModule } from 'modules/menuitem/menuitem.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    OrderModule,
    OrderitemModule,
    MenuitemModule,
  ],
})
export class AppModule implements NestModule {
  configure(context: MiddlewareConsumer) {
    context.apply(JwtMiddleware).exclude('api/login').forRoutes('*');
  }
}
