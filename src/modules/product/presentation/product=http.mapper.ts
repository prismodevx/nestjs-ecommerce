import { Injectable } from '@nestjs/common';
import { Product } from '@modules/product/domain/product.entity';
import { ProductBasicResponseDto } from '@modules/product/presentation/dto/product-basic.response.dto';
import { ProductListReadModel } from '@modules/product/application/query/get-products/product-list.read-model';
import { ProductListResponseDto } from '@modules/product/presentation/dto/product-list.response.dto';

@Injectable()
export class ProductHttpMapper {
  static toBasicResponse(product: Product): ProductBasicResponseDto {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.getStock(),
    };
  }

  static toListResponse(product: ProductListReadModel): ProductListResponseDto {
    return {
      id: product.id,
      name: product.name,
    };
  }
}
