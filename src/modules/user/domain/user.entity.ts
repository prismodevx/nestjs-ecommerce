import { HashService } from '@shared/hash/domain/hash.service';

export enum Role {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
}

export class User {
  constructor(
    public readonly id: string,
    private email: string,
    private password: string,
    private name: string,
    private role: Role = Role.CUSTOMER,
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.email.includes('@')) {
      throw new Error('Invalid email');
    }
    if (!this.password) {
      throw new Error('Password required');
    }
    if (!this.name || this.name.trim().length < 2) {
      throw new Error('Name must be at least 2 characters');
    }
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getName(): string {
    return this.name;
  }

  getRole(): Role {
    return this.role;
  }

  validatePassword(
    plainPassword: string,
    hashService: HashService,
  ): Promise<boolean> {
    return hashService.compare(plainPassword, this.password);
  }
}
