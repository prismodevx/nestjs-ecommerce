export class OrderItem {
  constructor(
    public readonly productId: string,
    public readonly quantity: number,
    public readonly unitPrice: number,
  ) {
    if (!productId) {
      throw new Error('Product ID is required');
    }

    if (quantity <= 0) {
      throw new Error('Quantity must be > 0');
    }

    if (unitPrice < 0) {
      throw new Error('Unit price cannot be negative');
    }
  }

  getTotal() {
    return this.quantity * this.unitPrice;
  }
}
