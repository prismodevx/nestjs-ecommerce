import { Product } from './product.entity';

export interface ProductRepository {
  findByIdForUpdate(id: string, tx: any): Promise<Product | null>;
  save(product: Product, tx: any): Promise<void>;
}
