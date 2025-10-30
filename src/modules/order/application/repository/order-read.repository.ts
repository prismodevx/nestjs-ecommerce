import { IReadRepository } from '@shared/database/domain/read.repository.interface';
import { OrderReadModel } from '@modules/order/application/query/get-order/order.read-model';

export interface OrderReadRepository extends IReadRepository {
  findById(id: string): Promise<OrderReadModel | null>;
}
