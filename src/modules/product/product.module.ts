import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/database/database.module';
import { CreateProductUseCase } from '@modules/product/application/command/create-product/create-product.use-case';
import { ProductController } from '@modules/product/presentation/product.controller';
import { GetProductsUseCase } from '@modules/product/application/query/get-products/get-products.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [CreateProductUseCase, GetProductsUseCase],
  exports: [],
})
export class ProductModule {}
