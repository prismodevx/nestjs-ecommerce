import { Module } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
