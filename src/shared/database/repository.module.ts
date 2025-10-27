import { Module } from '@nestjs/common';
import { PrismaModule } from '@shared/database/prisma/prisma.module';
import { PrismaOrderRepository } from '@modules/order/infrastructure/prisma-order.repository';
import { PrismaProductRepository } from '@modules/product/infraestructure/prisma-product.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: 'ProductRepository',
      useClass: PrismaProductRepository,
    },
    {
      provide: 'OrderRepository',
      useClass: PrismaOrderRepository,
    },
  ],
  exports: ['ProductRepository', 'OrderRepository'],
})
export class RepositoryModule {}
