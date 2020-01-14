import {HttpModule, Module} from '@nestjs/common';
import { SecurityController } from './controllers/security.controller';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {JwtStrategy} from './jwt-strategy';
import {SecurityService} from './services/security.service';
import {UniqueUserEmailValidator} from './validators/unique-user-email.validator';
import {UserPasswordsEqualValidator} from './validators/user-passwords-equal.validator';
import {EntityModule} from '../entity/entity.module';
import {UserSecurityKeyValidator} from './validators/user-security-key.validator';
import { FacebookAccountController } from './controllers/facebook-account.controller';
import {FacebookService} from './services/facebook.service';

@Module({

  imports: [
      HttpModule,
      EntityModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.APP_SECRET,
    }),
  ],

  controllers: [
    SecurityController,
    FacebookAccountController
  ],

  providers: [
    JwtStrategy,
    SecurityService,
    FacebookService,
    UniqueUserEmailValidator,
    UserPasswordsEqualValidator,
    UserSecurityKeyValidator
  ],

  exports: [
    EntityModule,
    PassportModule,
    JwtModule
  ],
})
export class SecurityModule {}
