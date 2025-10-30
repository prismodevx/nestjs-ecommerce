import { Global, Module } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma/prisma.service';
import { DiscoveryModule } from '@nestjs/core';
import { UnitOfWorkService } from '@shared/database/prisma/unit-of-work.service';
import { ConfigModule } from '@/config/config.module';

@Global()
@Module({
  imports: [ConfigModule, DiscoveryModule],
  providers: [
    PrismaService,
    {
      provide: 'IUnitOfWork',
      useClass: UnitOfWorkService,
    },
  ],
  exports: ['IUnitOfWork', PrismaService],
})
export class PrismaModule {}
