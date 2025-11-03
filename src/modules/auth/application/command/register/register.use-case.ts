import { Injectable } from '@nestjs/common';
import { RegisterCommand } from '@modules/auth/application/command/register/register.command';

@Injectable()
export class RegisterUseCase {
  constructor(

  ) {}

  async execute(command: RegisterCommand): Promise<> {}
}