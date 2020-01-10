import { Module } from '@nestjs/common';
import { SecurityController } from './security.controller';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {JwtStrategy} from './jwt-strategy';
import {SecurityService} from './services/security.service';
import {JwtAuthService} from './services/jwt-auth.service';
import {UniqueUserEmailValidator} from './validators/unique-user-email.validator';
import {UserPasswordsEqualValidator} from './validators/user-passwords-equal.validator';
import {EntityModule} from '../entity/entity.module';

@Module({

  imports: [
      EntityModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.APP_SECRET,
    }),
  ],

  controllers: [SecurityController],

  providers: [
    JwtStrategy,
    SecurityService,
    // JwtAuthService,
    UniqueUserEmailValidator,
    UserPasswordsEqualValidator,

  ],

  exports: [
    EntityModule,
    PassportModule,
    JwtModule
  ],
})
export class SecurityModule {}
