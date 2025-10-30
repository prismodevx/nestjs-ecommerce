import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { OrderReadRepository } from '@modules/order/application/repository/order-read.repository';
import { OrderReadModel } from '@modules/order/application/query/get-order/order.read-model';

@Injectable()
export class GetOrderUseCase {
  constructor(
    @Inject('OrderReadRepository')
    private readonly orderReadRepo: OrderReadRepository,
  ) {}

  async execute(id: string): Promise<OrderReadModel> {
    const order = await this.orderReadRepo.findById(id);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }
}
