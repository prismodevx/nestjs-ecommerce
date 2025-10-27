import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma/prisma.service';
import { ProductRepository } from '@modules/product/domain/product.repository';
import { OrderRepository } from '@modules/order/domain/order.repository';
import { Order } from '@modules/order/domain/order.entity';
import { randomUUID } from 'crypto';
import { OrderItem } from '@modules/order/domain/order-item.entity';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('ProductRepository')
    private readonly productRepo: ProductRepository,
    @Inject('OrderRepository')
    private readonly orderRepo: OrderRepository,
  ) {}

  async execute(dto: { items: { productId: string; quantity: number }[] }) {
    return this.prisma.$transaction(async (tx) => {
      const order = new Order(randomUUID());

      for (const i of dto.items) {
        const product = await this.productRepo.findByIdForUpdate(
          i.productId,
          tx,
        );
        if (!product) throw new Error('Product not found');

        product.decreaseStock(i.quantity);

        const item = new OrderItem(product.id, i.quantity, product.price);
        order.addItem(item);

        await this.productRepo.save(product, tx);
      }

      await this.orderRepo.save(order, tx);

      return { orderId: order.id, total: order.getTotal() };
    });
  }
}
