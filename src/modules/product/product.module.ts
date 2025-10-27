import { Module } from '@nestjs/common';
import { PrismaModule } from '@shared/database/prisma/prisma.module';
import { PrismaProductRepository } from '@modules/product/infraestructure/prisma-product.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: 'ProductRepository',
      useClass: PrismaProductRepository,
    },
  ],
  exports: ['ProductRepository'],
})
export class ProductModule {}
