export type ITransactionClient = object;

export interface IUnitOfWork {
  execute<T>(work: (tx: ITransactionClient) => Promise<T>): Promise<T>;
}
