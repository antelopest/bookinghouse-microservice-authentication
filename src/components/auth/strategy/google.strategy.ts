import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService, Provider } from "./auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: '1021016304933-6bdcjmjnrhkbmudqnihavvfbc2ibedu2.apps.googleusercontent.com',
      clientSecret: 'IWx0hsttCwHE6PFGSxWzC3LG',
      callbackURL: 'http://localhost:3000/auth/google/callback',
      passReqToCallback: true,
      scope: ['profile'],
    });
  }
  // tslint:disable-next-line:ban-types
  async validate(request: any, accessToken: string, refreshToken: string, profile: any, done: Function) {
    try {
      // tslint:disable-next-line:no-console
      console.log(profile);
      const jwt: string = await this.authService.validateOAuthLogin(profile.id, Provider.GOOGLE);
      const user = { jwt };
      done(null, user);
    } catch (err) {
      // console.log(err)
      done(err, false);
    }
  }
}