import { Module } from '@nestjs/common';
import { PrismaModule } from '@shared/database/prisma/prisma.module';
import { PrismaOrderRepository } from '@modules/order/infrastructure/prisma-order.repository';
import { PrismaProductRepository } from '@modules/product/infraestructure/prisma-product.repository';
import { PrismaProductReadRepository } from '@modules/product/infraestructure/prisma-product-read.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: 'ProductRepository',
      useClass: PrismaProductRepository,
    },
    {
      provide: 'ProductReadRepository',
      useClass: PrismaProductReadRepository,
    },
    {
      provide: 'OrderRepository',
      useClass: PrismaOrderRepository,
    },
  ],
  exports: ['ProductRepository', 'ProductReadRepository', 'OrderRepository'],
})
export class RepositoryModule {}
