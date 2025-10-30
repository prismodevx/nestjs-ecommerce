import { OrderItem } from './order-item.entity';

export class Order {
  private items: OrderItem[] = [];
  private total = 0;

  constructor(public readonly id: string) {}

  addItem(item: OrderItem) {
    if (this.items.some((i) => i.productId === item.productId)) {
      throw new Error(`Product ${item.productId} already added to order`);
    }

    if (item.quantity <= 0) {
      throw new Error('Quantity must be greater than zero');
    }

    if (item.unitPrice < 0) {
      throw new Error('Unit price must be >= 0');
    }

    this.items.push(item);

    this.total += item.getTotal();
  }

  validate() {
    if (this.items.length === 0) {
      throw new Error('Order must have at least one item');
    }
  }

  getTotal() {
    return this.total;
  }

  getItems(): ReadonlyArray<OrderItem> {
    return [...this.items];
  }
}
