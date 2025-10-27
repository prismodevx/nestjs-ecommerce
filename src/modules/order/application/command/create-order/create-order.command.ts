export class CreateOrderCommand {
  constructor(
    public readonly items: { productId: string; quantity: number }[],
  ) {}
}
