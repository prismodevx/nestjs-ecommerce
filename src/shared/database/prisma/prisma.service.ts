import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@/generated/client/client';
import { ConfigService } from '@/config/config.service';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private configService: ConfigService) {
    const databaseConfig = configService.database;

    if (!databaseConfig?.url) {
      throw new Error('Database configuration is not available');
    }

    super({
      datasources: {
        db: {
          url: configService.database.url,
        },
      },
      log: configService.database.logQueries
        ? ['query', 'info', 'warn', 'error']
        : ['warn', 'error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
