import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import {
  databaseConfig,
  databaseConfigSchema,
} from '@/config/schemas/database.config';
import { appConfig, appConfigSchema } from '@/config/schemas/app.config';
import { ConfigService } from '@/config/config.service';

// 👇 Debug logging
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Current directory:', process.cwd());
console.log('Environment files being loaded:');
console.log(
  '- .env.development.local:',
  require('fs').existsSync('.env.development.local'),
);
console.log(
  '- .env.development:',
  require('fs').existsSync('.env.development'),
);
console.log('- .env.local:', require('fs').existsSync('.env.local'));
console.log('- .env:', require('fs').existsSync('.env'));

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        `.env.${process.env.NODE_ENV || 'development'}.local`,
        `.env.${process.env.NODE_ENV || 'development'}`,
        '.env.local',
        '.env',
      ],
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      load: [appConfig, databaseConfig],
      validationSchema: appConfigSchema.concat(databaseConfigSchema),
      cache: true,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
