import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { CreateOrderUseCase } from '@modules/order/application/command/create-order/create-order.use-case';
import { CreateOrderDto } from '@modules/order/presentation/dto/create-order.dto';
import { CreateOrderCommand } from '@modules/order/application/command/create-order/create-order.command';
import { GetOrderUseCase } from '@modules/order/application/query/get-order/get-order.use-case';
import { OrderHttpMapper } from '@modules/order/presentation/order-http.mapper';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly createUseCase: CreateOrderUseCase,
    private readonly getByIdUseCase: GetOrderUseCase,
  ) {}

  @Get(':id')
  async getById(@Param('id') id: string) {
    const result = await this.getByIdUseCase.execute(id);
    return OrderHttpMapper.toResponse(result);
  }

  @Post()
  async create(@Body() dto: CreateOrderDto) {
    const command = new CreateOrderCommand(dto.items);

    return await this.createUseCase.execute(command);
  }
}
