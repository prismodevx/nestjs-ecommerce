import { Module } from '@nestjs/common';
import { PrismaModule } from '@shared/database/prisma/prisma.module';
import { RepositoryModule } from '@shared/database/repository.module';

@Module({
  imports: [PrismaModule, RepositoryModule],
  exports: [PrismaModule, RepositoryModule],
})
export class DatabaseModule {}
