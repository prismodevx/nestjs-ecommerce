export class OrderItem {
  constructor(
    public readonly productId: string,
    public readonly quantity: number,
    public readonly unitPrice: number,
  ) {}

  getTotal() {
    return this.quantity * this.unitPrice;
  }
}
