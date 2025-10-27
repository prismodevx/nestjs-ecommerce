export class Product {
  constructor(
    public readonly id: string,
    public name: string,
    public price: number,
    private stock: number,
  ) {}

  decreaseStock(quantity: number) {
    if (quantity <= 0) {
      throw new Error('Invalid quantity');
    }

    if (quantity > this.stock) {
      throw new Error('Not enough stock');
    }

    this.stock -= quantity;
  }

  getStock() {
    return this.stock;
  }
}
