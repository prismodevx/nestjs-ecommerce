import { Global, Module } from '@nestjs/common';
import { BcryptHashService } from '@shared/hash/infrastructure/bcrypt-hash.service';

@Global()
@Module({
  providers: [
    {
      provide: 'HashService',
      useClass: BcryptHashService,
    },
  ],
  exports: ['HashService'],
})
export class HashModule {}
