import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '@modules/user/domain/user.repository';
import { TokenService } from '@modules/auth/domain/token.service';
import { LoginCommand } from '@modules/auth/application/command/login/login.command';
import { HashService } from '@shared/hash/domain/hash.service';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepo: UserRepository,
    @Inject('TokenService')
    private readonly tokenService: TokenService,
    @Inject('HashService')
    private readonly hashService: HashService,
  ) {}

  async execute(
    command: LoginCommand,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userRepo.findByEmail(command.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValid = await user.validatePassword(
      command.password,
      this.hashService,
    );
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.getEmail(),
      role: user.getRole(),
    };

    const accessToken = this.tokenService.generateAccessToken(payload);
    const refreshToken = this.tokenService.generateRefreshToken(payload);

    return { accessToken, refreshToken };
  }
}
