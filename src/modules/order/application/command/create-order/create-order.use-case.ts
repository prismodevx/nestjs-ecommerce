import { Inject, Injectable } from '@nestjs/common';
import { IUnitOfWork } from '@shared/database/domain/unit-of-work.interface';
import { ProductRepository } from '@modules/product/domain/product.repository';
import { OrderRepository } from '@modules/order/domain/order.repository';
import { CreateOrderCommand } from '@modules/order/application/command/create-order/create-order.command';
import { randomUUID } from 'crypto';
import { Order } from '@modules/order/domain/order.entity';
import { OrderItem } from '@modules/order/domain/order-item.entity';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject('IUnitOfWork')
    private readonly uow: IUnitOfWork,
    @Inject('ProductRepository')
    private readonly productRepo: ProductRepository,
    @Inject('OrderRepository')
    private readonly orderRepo: OrderRepository,
  ) {}

  async execute(command: CreateOrderCommand) {
    return this.uow.execute(async () => {
      const order = new Order(randomUUID());

      const productIds = command.items.map((i) => i.productId);

      const products = await this.productRepo.findManyByIdForUpdate(productIds);

      const productsMap = new Map(products.map((p) => [p.id, p]));

      for (const i of command.items) {
        const product = productsMap.get(i.productId);
        if (!product) {
          throw new Error('Product not found');
        }

        product.decreaseStock(i.quantity);

        const item = new OrderItem(product.id, i.quantity, product.price);
        order.addItem(item);
      }

      order.validate();

      await this.productRepo.saveMany(products);
      await this.orderRepo.save(order);

      return { orderId: order.id, total: order.getTotal() };
    });
  }
}
