import { Injectable } from '@nestjs/common';
import { User } from '@modules/user/domain/user.entity';
import { UserResponseDto } from '@modules/user/presentation/dto/user.response.dto';

@Injectable()
export class UserHttpMapper {
  static toResponse(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.getEmail(),
      name: user.getName(),
      role: user.getRole(),
    };
  }
}
