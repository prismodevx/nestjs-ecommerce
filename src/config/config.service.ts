import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { Config } from './types/config.type';
import { AppConfig } from '@/config/schemas/app.config';
import { DatabaseConfig } from '@/config/schemas/database.config';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService<Config, true>) {}

  get app(): AppConfig {
    return this.configService.get('app', { infer: true });
  }

  get database(): DatabaseConfig {
    return this.configService.get('database', { infer: true });
  }

  get isDevelopment(): boolean {
    return this.app.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.app.nodeEnv === 'production';
  }
}
