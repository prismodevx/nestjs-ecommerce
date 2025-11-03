import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from '@modules/auth/presentation/dto/register.dto';
import { Public } from '@modules/auth/infrastructure/decorators/public.decorator';
import { RegisterCommand } from '@modules/auth/application/command/register/register.command';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Public()
  @Post('register')
  register(@Body() dto: RegisterDto) {
    const command = new RegisterCommand(dto.email, dto.password, dto.name);
    console.log('funciona el dto', command);
  }
}
