export class CreateOrderDto {
  items: { productId: string; quantity: number }[];
}
