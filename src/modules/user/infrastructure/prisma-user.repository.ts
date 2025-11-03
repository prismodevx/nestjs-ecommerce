import { Injectable } from '@nestjs/common';
import { TransactionalRepository } from '@shared/database/prisma/unit-of-work.service';
import { UserRepository } from '@modules/user/domain/user.repository';
import { BaseRepository } from '@shared/database/prisma/base.repository';
import { PrismaService } from '@shared/database/prisma/prisma.service';
import { Role, User } from '@modules/user/domain/user.entity';
import { User as PrismaUser } from '@/generated/prisma/client';

@Injectable()
@TransactionalRepository()
export class PrismaUserRepository
  extends BaseRepository
  implements UserRepository
{
  constructor(defaultPrisma: PrismaService) {
    super(defaultPrisma);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) return null;

    return this.toDomain(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) return null;

    return this.toDomain(user);
  }

  private toDomain(raw: PrismaUser): User {
    return new User(
      raw.id,
      raw.email,
      raw.password,
      raw.name,
      raw.role as Role,
    );
  }
}
