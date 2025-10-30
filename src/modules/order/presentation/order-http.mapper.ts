import { Injectable } from '@nestjs/common';
import { OrderReadModel } from '@modules/order/application/query/get-order/order.read-model';
import { OrderResponseDto } from '@modules/order/presentation/dto/order.response.dto';

@Injectable()
export class OrderHttpMapper {
  static toResponse(order: OrderReadModel): OrderResponseDto {
    return {
      ...order,
    };
  }
}
