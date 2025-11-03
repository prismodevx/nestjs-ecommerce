import { Inject, Injectable } from '@nestjs/common';
import { RegisterCommand } from '@modules/auth/application/command/register/register.command';
import { UserRepository } from '@modules/user/domain/user.repository';
import { Role, User } from '@modules/user/domain/user.entity';
import { randomUUID } from 'crypto';
import { HashService } from '@shared/hash/domain/hash.service';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepo: UserRepository,
    @Inject('HashService')
    private readonly hashService: HashService,
  ) {}

  async execute(command: RegisterCommand): Promise<User> {
    const existingUser = await this.userRepo.findByEmail(command.email);
    if (existingUser) {
      throw new Error(`User already exists`);
    }

    const hashedPassword = await this.hashService.hash(command.password);

    const user = new User(
      randomUUID(),
      command.email,
      hashedPassword,
      command.name,
      Role.CUSTOMER,
    );

    await this.userRepo.create(user);

    return user;
  }
}
