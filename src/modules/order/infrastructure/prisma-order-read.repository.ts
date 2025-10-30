import { Injectable } from '@nestjs/common';
import { BaseReadRepository } from '@shared/database/prisma/read.repository';
import { OrderReadRepository } from '@modules/order/application/repository/order-read.repository';
import { PrismaService } from '@shared/database/prisma/prisma.service';
import { OrderReadModel } from '@modules/order/application/query/get-order/order.read-model';

@Injectable()
export class PrismaOrderReadRepository
  extends BaseReadRepository
  implements OrderReadRepository
{
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  async findById(id: string): Promise<OrderReadModel | null> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      select: {
        id: true,
        total: true,
        items: {
          select: {
            id: true,
            productId: true,
            quantity: true,
            unitPrice: true,
            Product: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          take: 200,
        },
      },
    });

    if (!order) return null;

    return {
      id: order.id,
      total: Number(order.total ?? 0),
      items: order.items.map((it) => ({
        id: it.id,
        productId: it.productId ?? it.Product?.id ?? '',
        name: it.Product?.name ?? '',
        unitPrice: Number(it.unitPrice ?? 0),
        quantity: it.quantity,
      })),
    };
  }
}
