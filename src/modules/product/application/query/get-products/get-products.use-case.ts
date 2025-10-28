import { Inject, Injectable } from '@nestjs/common';
import { ProductReadRepository } from '@modules/product/application/repository/product-read.repository';
import { ProductListReadModel } from '@modules/product/application/query/get-products/product-list.read-model';

@Injectable()
export class GetProductsUseCase {
  constructor(
    @Inject('ProductReadRepository')
    private readonly productReadRepo: ProductReadRepository,
  ) {}

  async execute(): Promise<ProductListReadModel[]> {
    return await this.productReadRepo.findAll();
  }
}
