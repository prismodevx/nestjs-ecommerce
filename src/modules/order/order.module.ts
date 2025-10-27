import { Module } from '@nestjs/common';
import { CreateOrderUseCase } from '@modules/order/application/command/create-order/create-order.use-case';
import { OrderController } from '@modules/order/presentation/order.controller';
import { DatabaseModule } from '@shared/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderController],
  providers: [CreateOrderUseCase],
})
export class OrderModule {}
