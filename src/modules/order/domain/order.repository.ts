import { Order } from './order.entity';

export interface OrderRepository {
  save(order: Order, tx: any): Promise<void>;
}
