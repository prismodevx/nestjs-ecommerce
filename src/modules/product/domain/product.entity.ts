export class Product {
  constructor(
    public readonly id: string,
    public name: string,
    public price: number,
    private stock: number,
  ) {
    if (!id) throw new Error('Product id required');

    if (price < 0) {
      throw new Error('Price must be >= 0');
    }

    if (stock < 0) {
      throw new Error('Stock cannot be negative');
    }
  }

  decreaseStock(quantity: number) {
    if (quantity <= 0) {
      throw new Error('Invalid quantity');
    }

    if (quantity > this.stock) {
      throw new Error(`Not enough stock for this product: ${this.name}`);
    }

    this.stock -= quantity;
  }

  getStock() {
    return this.stock;
  }
}
