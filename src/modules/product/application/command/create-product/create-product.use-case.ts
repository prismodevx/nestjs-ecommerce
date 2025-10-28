import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '@modules/product/domain/product.repository';
import { Product } from '@modules/product/domain/product.entity';
import { CreateProductCommand } from '@modules/product/application/command/create-product/create-product.command';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepo: ProductRepository,
  ) {}

  async execute(command: CreateProductCommand): Promise<Product> {
    const product = new Product(
      randomUUID(),
      command.name,
      command.price,
      command.stock,
    );

    await this.productRepo.save(product);

    return product;
  }
}
