import { DatabaseConfig } from '@/config/schemas/database.config';
import { AppConfig } from '@/config/schemas/app.config';

export interface Config {
  app: AppConfig;
  database: DatabaseConfig;
}
