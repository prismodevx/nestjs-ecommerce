export class CreateProductCommand {
  constructor(
    public readonly name: string,
    public readonly stock: number,
    public readonly price: number,
  ) {
    this.validate();
  }

  validate() {
    if (this.name.trim().length === 0) {
      throw new Error('Product name cannot be empty');
    }

    if (this.stock < 0) {
      throw new Error('Product stock cannot be negative');
    }

    if (this.price < 0) {
      throw new Error('Product price cannot be negative');
    }
  }
}
