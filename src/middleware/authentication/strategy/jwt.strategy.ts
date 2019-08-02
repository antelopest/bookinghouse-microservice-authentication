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
      passReqToCallback: false,
      secretOrKey: 'mySecret',
    });
  }

  async validate(payload: IJwtPayload) {
    const foundUser = await this.authService.validateUser(payload);
    if (foundUser) {
      return foundUser;
    } else {
      throw new UnauthorizedException();
    }
  }
}
