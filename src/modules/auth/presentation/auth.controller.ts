import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from '@modules/auth/presentation/dto/register.dto';
import { Public } from '@modules/auth/infrastructure/decorators/public.decorator';
import { RegisterCommand } from '@modules/auth/application/command/register/register.command';
import { RegisterUseCase } from '@modules/auth/application/command/register/register.use-case';
import { UserHttpMapper } from '@modules/user/presentation/user-http.mapper';
import { LoginUseCase } from '@modules/auth/application/command/login/login.use-case';
import { LoginDto } from '@modules/auth/presentation/dto/login.dto';
import { LoginCommand } from '@modules/auth/application/command/login/login.command';
import { AuthHttpMapper } from '@modules/auth/presentation/auth-http.mapper';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Public()
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const command = new RegisterCommand(dto.email, dto.password, dto.name);
    const result = await this.registerUseCase.execute(command);

    return UserHttpMapper.toResponse(result);
  }

  @Public()
  @Post('login')
  async login(@Body() dto: LoginDto) {
    const command = new LoginCommand(dto.email, dto.password);
    const result = await this.loginUseCase.execute(command);

    return AuthHttpMapper.toResponse(result);
  }
}
