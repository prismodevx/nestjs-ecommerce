import { Product } from './product.entity';
import { IBaseRepository } from '@shared/database/domain/base.repository.interface';

export interface ProductRepository extends IBaseRepository {
  findByIdForUpdate(id: string): Promise<Product | null>;
  findManyByIdForUpdate(ids: string[]): Promise<Product[]>;
  save(product: Product): Promise<void>;
  saveMany(products: Product[]): Promise<void>;
}
