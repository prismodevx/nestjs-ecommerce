import { OrderItem } from './order-item.entity';

export class Order {
  private items: OrderItem[] = [];
  private total = 0;

  constructor(public readonly id: string) {}

  addItem(item: OrderItem) {
    this.items.push(item);
    this.total += item.getTotal();
  }

  getTotal() {
    return this.total;
  }

  getItems() {
    return this.items;
  }
}
