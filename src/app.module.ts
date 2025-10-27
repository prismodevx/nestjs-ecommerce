import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from '@modules/order/order.module';
import { ProductModule } from '@modules/product/product.module';
import { DatabaseModule } from '@shared/database/database.module';

@Module({
  imports: [
    // config
    ConfigModule.forRoot(),

    // databases and repositories
    DatabaseModule,

    // modules
    OrderModule,
    ProductModule,
  ],
})
export class AppModule {}
