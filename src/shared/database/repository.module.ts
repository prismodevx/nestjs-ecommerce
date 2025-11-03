import { Module } from '@nestjs/common';
import { PrismaModule } from '@shared/database/prisma/prisma.module';
import { PrismaOrderRepository } from '@modules/order/infrastructure/prisma-order.repository';
import { PrismaProductRepository } from '@modules/product/infraestructure/prisma-product.repository';
import { PrismaProductReadRepository } from '@modules/product/infraestructure/prisma-product-read.repository';
import { PrismaOrderReadRepository } from '@modules/order/infrastructure/prisma-order-read.repository';
import { PrismaUserRepository } from '@modules/user/infrastructure/prisma-user.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    // users
    {
      provide: 'UserRepository',
      useClass: PrismaUserRepository,
    },

    // products
    {
      provide: 'ProductRepository',
      useClass: PrismaProductRepository,
    },
    {
      provide: 'ProductReadRepository',
      useClass: PrismaProductReadRepository,
    },

    // orders
    {
      provide: 'OrderRepository',
      useClass: PrismaOrderRepository,
    },
    {
      provide: 'OrderReadRepository',
      useClass: PrismaOrderReadRepository,
    },
  ],
  exports: [
    // users
    'UserRepository',

    // products
    'ProductRepository',
    'ProductReadRepository',

    // orders
    'OrderRepository',
    'OrderReadRepository',
  ],
})
export class RepositoryModule {}
