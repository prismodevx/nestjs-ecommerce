import { Test } from '@nestjs/testing';
import { PrismaService } from '@shared/database/prisma/prisma.service';
import { CreateOrderUseCase } from './create-order.use-case';
import { AppModule } from '@/app.module';

describe('Concurrency test - Multiple users, multiple products', () => {
  let prisma: PrismaService;
  let createOrder: CreateOrderUseCase;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleRef.get(PrismaService);
    createOrder = moduleRef.get(CreateOrderUseCase);
    await prisma.$connect();
  });

  beforeEach(async () => {
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();

    await prisma.product.createMany({
      data: [
        { id: 'p1', name: 'Product 1', stock: 430, price: 100 },
        { id: 'p2', name: 'Product 2', stock: 10, price: 200 },
        { id: 'p3', name: 'Product 3', stock: 22, price: 300 },
      ],
    });
  });

  it('should handle concurrent orders across multiple products', async () => {
    const users = Array.from({ length: 100 }, (_, i) => `user-${i + 1}`);

    const tasks = users.map((userId, i) => {
      const productId = `p${(i % 3) + 1}`;
      const quantity = 2;

      return createOrder
        .execute({
          items: [{ productId, quantity }],
        })
        .catch((err) => {
          return { error: err.message };
        });
    }, 20000);

    const results = await Promise.all(tasks);

    const failedOrders = results.filter(
      (r): r is { error: any } => 'error' in r,
    );
    expect(failedOrders.length).toBeGreaterThan(0);

    const products = await prisma.product.findMany();
    for (const p of products) {
      expect(p.stock).toBeGreaterThanOrEqual(0);
    }

    console.log('Final stock:', products);
  }, 20000);

  afterAll(async () => {
    await prisma.$disconnect();
  });
});
