interface OrderItem {
  id: string;
  productId: string;
  name: string;
  unitPrice: number;
  quantity: number;
}

export interface OrderReadModel {
  id: string;
  total: number;
  items: OrderItem[];
}
