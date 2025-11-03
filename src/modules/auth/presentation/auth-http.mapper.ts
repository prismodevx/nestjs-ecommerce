import { Injectable } from '@nestjs/common';
import { AuthResponseDto } from '@modules/auth/presentation/dto/auth.response.dto';

@Injectable()
export class AuthHttpMapper {
  static toResponse(payload: {
    accessToken: string;
    refreshToken: string;
  }): AuthResponseDto {
    return {
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
    };
  }
}
