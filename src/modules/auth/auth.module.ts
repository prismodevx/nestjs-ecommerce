import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from '@modules/auth/presentation/auth.controller';
import { RegisterUseCase } from '@modules/auth/application/command/register/register.use-case';
import { DatabaseModule } from '@shared/database/database.module';
import { BcryptHashService } from '@shared/hash/infrastructure/bcrypt-hash.service';
import { LoginUseCase } from '@modules/auth/application/command/login/login.use-case';
import { JwtTokenService } from '@modules/auth/infrastructure/jwt-token.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: configService.get<string>('jwt.expiresIn'),
        },
      }),
    }),
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [
    RegisterUseCase,
    LoginUseCase,

    {
      provide: 'HashService',
      useClass: BcryptHashService,
    },
    {
      provide: 'TokenService',
      useClass: JwtTokenService,
    },
  ],
  exports: [],
})
export class AuthModule {}
