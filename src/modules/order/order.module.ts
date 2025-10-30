import { Module } from '@nestjs/common';
import { CreateOrderUseCase } from '@modules/order/application/command/create-order/create-order.use-case';
import { OrderController } from '@modules/order/presentation/order.controller';
import { DatabaseModule } from '@shared/database/database.module';
import { GetOrderUseCase } from '@modules/order/application/query/get-order/get-order.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderController],
  providers: [CreateOrderUseCase, GetOrderUseCase],
})
export class OrderModule {}
