import { Module } from '@nestjs/common';
import { OrderModule } from '@modules/order/order.module';
import { ProductModule } from '@modules/product/product.module';
import { DatabaseModule } from '@shared/database/database.module';
import { ConfigModule } from '@/config/config.module';

@Module({
  imports: [
    // config
    ConfigModule,

    // databases and repositories
    DatabaseModule,

    // modules
    OrderModule,
    ProductModule,
  ],
})
export class AppModule {}
