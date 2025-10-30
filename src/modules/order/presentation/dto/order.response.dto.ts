interface OrderItem {
  id: string;
  productId: string;
  name: string;
  unitPrice: number;
  quantity: number;
}

export interface OrderResponseDto {
  id: string;
  total: number;
  items: OrderItem[];
}
