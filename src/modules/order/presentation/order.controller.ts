import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderUseCase } from '@modules/order/application/command/create-order/create-order.use-case';
import { CreateOrderDto } from '@modules/order/presentation/dto/create-order.dto';
import { CreateOrderCommand } from '@modules/order/application/command/create-order/create-order.command';

@Controller('orders')
export class OrderController {
  constructor(private readonly createUseCase: CreateOrderUseCase) {}

  @Post()
  async create(@Body() dto: CreateOrderDto) {
    const command = new CreateOrderCommand(dto.items);

    return this.createUseCase.execute(command);
  }
}
