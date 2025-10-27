import { ITransactionClient } from '@shared/database/domain/unit-of-work.interface';

export interface IBaseRepository {
  setTransactionClient(tx: ITransactionClient): void;
}
