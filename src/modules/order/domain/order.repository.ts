import { Order } from './order.entity';
import { IBaseRepository } from '@shared/database/domain/base.repository.interface';

export interface OrderRepository extends IBaseRepository {
  save(order: Order): Promise<void>;
}
