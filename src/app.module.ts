import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@shared/database/prisma/prisma.module';
import { OrderModule } from '@modules/order/order.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, OrderModule],
})
export class AppModule {}
