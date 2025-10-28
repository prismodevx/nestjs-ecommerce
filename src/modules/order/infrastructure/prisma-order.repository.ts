import { Order } from '@modules/order/domain/order.entity';
import { Injectable } from '@nestjs/common';
import { OrderRepository } from '@modules/order/domain/order.repository';
import { PrismaService } from '@shared/database/prisma/prisma.service';
import { randomUUID } from 'crypto';
import { BaseRepository } from '@shared/database/prisma/base.repository';
import { TransactionalRepository } from '@shared/database/prisma/unit-of-work.service';

@Injectable()
@TransactionalRepository()
export class PrismaOrderRepository
  extends BaseRepository
  implements OrderRepository
{
  constructor(private readonly defaultPrisma: PrismaService) {
    super(defaultPrisma);
  }

  async save(order: Order): Promise<void> {
    await this.prisma.order.create({
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
