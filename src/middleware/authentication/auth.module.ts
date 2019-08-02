import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { UserModule } from '../../components/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as passport from 'passport';
import { BcryptService } from './bcrypt.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({ secretOrPrivateKey: 'mySecret' }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy, BcryptService],
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes(
        { path: '/users', method: RequestMethod.ALL },
        { path: '/users/*', method: RequestMethod.ALL },
      );
  }
}
