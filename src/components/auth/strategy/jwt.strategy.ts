import { Request } from 'express';
import { use } from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IJwtPayload } from '../interfaces/payload.interface';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'mySecret',
    });
  }

  async validate(payload: IJwtPayload) {
    const foundUser = await this.authService.validateUser(payload);
    if (!foundUser) {
      throw new UnauthorizedException();
    }
    return foundUser;
  }

  // async validate(req: Request, payload: IJwtPayload, done: Function) {
  //   const user = await this.authService.validateUser(payload);
  //   if (!user) {
  //     return done(new UnauthorizedException(), false);
  //   }
  //   done(null, user);
  // }

  // export const callback = (err, user, info) => {
  //   if (err) { return (err || new UnauthorizedException(info.message))};

  // }
}
