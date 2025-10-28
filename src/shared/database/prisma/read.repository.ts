import { PrismaService } from '@shared/database/prisma/prisma.service';

export abstract class BaseReadRepository {
  protected constructor(protected readonly prisma: PrismaService) {}

  protected buildPagination(page?: number, limit?: number) {
    const pageSize = limit || 20;
    const pageNumber = page || 1;

    return {
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
    };
  }

  protected buildOrderBy(sortBy?: string, sortOrder?: 'asc' | 'desc') {
    if (!sortBy) return undefined;

    return {
      [sortBy]: sortOrder || 'asc',
    };
  }
}
