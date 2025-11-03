import { Injectable } from '@nestjs/common';
import { TokenService } from '@modules/auth/domain/token.service';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '@modules/auth/domain/token.payload';

@Injectable()
export class JwtTokenService implements TokenService {
  constructor(
    private readonly nestJwtService: NestJwtService,
    private readonly configService: ConfigService,
  ) {}

  generateAccessToken(payload: TokenPayload): string {
    return this.nestJwtService.sign(payload);
  }

  generateRefreshToken(payload: TokenPayload): string {
    return this.nestJwtService.sign(payload, {
      expiresIn: this.configService.get<string>('jwt.refreshExpiresIn'),
    });
  }

  verifyRefreshToken(token: string): TokenPayload {
    return this.nestJwtService.verify(token);
  }
}
