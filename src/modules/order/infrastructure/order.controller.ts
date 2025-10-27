import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderUseCase } from '@modules/order/application/create-order.use-case';
import { CreateOrderDto } from '@modules/order/infrastructure/create-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly createUseCase: CreateOrderUseCase) {}

  @Post()
  async create(@Body() dto: CreateOrderDto) {
    return this.createUseCase.execute(dto);
  }
}
