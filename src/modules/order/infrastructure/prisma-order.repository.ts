import { Order } from '@modules/order/domain/order.entity';
import { Injectable } from '@nestjs/common';
import { OrderRepository } from '@modules/order/domain/order.repository';
import { PrismaService } from '@shared/database/prisma/prisma.service';
import { randomUUID } from 'crypto';

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
  constructor(private prisma: PrismaService) {}

  async save(order: Order, tx: any): Promise<void> {
    await tx.order.create({
      data: {
        id: order.id,
        total: order.getTotal(),
        items: {
          create: order.getItems().map((item) => ({
            id: randomUUID(),
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          })),
        },
      },
    });
  }
}
