import { Module } from '@nestjs/common';
import { SecurityController } from './security.controller';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.APP_SECRET,
    }),
  ],

  controllers: [SecurityController],

  exports: [
    PassportModule,
    JwtModule,
  ],
})
export class SecurityModule {}
