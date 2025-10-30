import { Prisma } from '@/generated/prisma/client';
import { IBaseRepository } from '@shared/database/domain/base.repository.interface';
import { PrismaService } from '@shared/database/prisma/prisma.service';

export abstract class BaseRepository implements IBaseRepository {
  protected prisma: Prisma.TransactionClient | PrismaService;

  protected constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  setTransactionClient(tx: Prisma.TransactionClient): void {
    this.prisma = tx;
  }

  protected resetClient(defaultPrisma: PrismaService): void {
    this.prisma = defaultPrisma;
  }
}
