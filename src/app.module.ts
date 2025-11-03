import { Module } from '@nestjs/common';
import { OrderModule } from '@modules/order/order.module';
import { ProductModule } from '@modules/product/product.module';
import { DatabaseModule } from '@shared/database/database.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from '@/config/app.config';
import { validationSchema } from '@/config/validation.schema';
import databaseConfig from '@/config/database.config';
import jwtConfig from '@/config/jwt.config';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  imports: [
    // config
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`, '.env'],
      load: [appConfig, databaseConfig, jwtConfig],
      validationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),

    // databases and repositories
    DatabaseModule,

    // shared
    AuthModule,

    // modules
    OrderModule,
    ProductModule,
  ],
})
export class AppModule {}
