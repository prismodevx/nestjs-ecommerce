import { IReadRepository } from '@shared/database/domain/read.repository.interface';
import { ProductListReadModel } from '@modules/product/application/query/get-products/product-list.read-model';

export interface ProductReadRepository extends IReadRepository {
  findAll(): Promise<ProductListReadModel[]>;
}
