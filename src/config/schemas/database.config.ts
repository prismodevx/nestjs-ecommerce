import * as Joi from 'joi';

export const databaseConfigSchema = Joi.object({
  DATABASE_URL: Joi.string().required().uri(),
  DB_LOG_QUERIES: Joi.boolean().default(false),
  DB_MAX_CONNECTIONS: Joi.number().default(10),
  DB_SSL: Joi.boolean().default(false),
  DB_TIMEOUT: Joi.number().default(5000),
});

export interface DatabaseConfig {
  url: string;
  logQueries: boolean;
  maxConnections: number;
  ssl: boolean;
  timeout: number;
}

export const databaseConfig = (): DatabaseConfig => ({
  url: process.env.DATABASE_URL || '',
  logQueries: process.env.DB_LOG_QUERIES === 'true',
  maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS || '10', 10),
  ssl: process.env.DB_SSL === 'true',
  timeout: parseInt(process.env.DB_TIMEOUT || '5000', 10),
});
