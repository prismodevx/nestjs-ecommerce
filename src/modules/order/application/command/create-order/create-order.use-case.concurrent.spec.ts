import { config } from 'dotenv';
config({ path: '.env' });
import { Test } from '@nestjs/testing';
import { CreateOrderUseCase } from '@modules/order/application/command/create-order/create-order.use-case';
import { UnitOfWorkService } from '@shared/database/prisma/unit-of-work.service';
import { PrismaProductRepository } from '@modules/product/infraestructure/prisma-product.repository';
import { PrismaOrderRepository } from '@modules/order/infrastructure/prisma-order.repository';
import { PrismaService } from '@shared/database/prisma/prisma.service';
import { DiscoveryService, Reflector } from '@nestjs/core';

describe('Concurrency test - CreateOrderUseCase', () => {
  let prisma: PrismaService;
  let createOrder: CreateOrderUseCase;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PrismaService,
        DiscoveryService,
        Reflector,
        UnitOfWorkService,
        {
          provide: 'IUnitOfWork',
          useExisting: UnitOfWorkService,
        },
        {
          provide: 'ProductRepository',
          useClass: PrismaProductRepository,
        },
        {
          provide: 'OrderRepository',
          useClass: PrismaOrderRepository,
        },
        CreateOrderUseCase,
      ],
    }).compile();

    prisma = moduleRef.get(PrismaService);
    createOrder = moduleRef.get(CreateOrderUseCase);

    // Clean DB (opcional)
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();

    // Insert product
    await prisma.product.create({
      data: {
        id: 'p1',
        name: 'Test Product',
        price: 10,
        stock: 5,
      },
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should prevent overselling with concurrent orders', async () => {
    const payload = {
      items: [{ productId: 'p1', quantity: 3 }],
    };

    const [result1, result2] = await Promise.allSettled([
      createOrder.execute(payload),
      createOrder.execute(payload),
    ]);

    expect(result1.status === 'rejected' || result2.status === 'rejected').toBe(
      true,
    );

    const product = await prisma.product.findUnique({
      where: { id: 'p1' },
    });

    expect(product).toBeDefined();
    expect(product!.stock).toBeGreaterThanOrEqual(0);
    expect(product!.stock).toBeLessThanOrEqual(2); // 5 - 3 = 2
  });
});
