import { Module } from '@nestjs/common';
import { PrismaModule } from '@shared/database/prisma/prisma.module';
import { CreateOrderUseCase } from '@modules/order/application/create-order.use-case';
import { PrismaOrderRepository } from '@modules/order/infrastructure/prisma-order.repository';
import { ProductModule } from '@modules/product/product.module';
import { OrderController } from '@modules/order/infrastructure/order.controller';

@Module({
  imports: [PrismaModule, ProductModule],
  controllers: [OrderController],
  providers: [
    CreateOrderUseCase,

    {
      provide: 'OrderRepository',
      useClass: PrismaOrderRepository,
    },
  ],
})
export class OrderModule {}
