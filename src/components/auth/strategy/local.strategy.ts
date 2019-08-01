import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from '../../user/interfaces/user.interface';
import { UserSchema } from '../../user/schemas/user.schema';
import { AuthService } from '../auth.service';
import { IJwtPayload } from '../interfaces/payload.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    @InjectModel('User') private readonly userModel: Model<IUser>,
  ) {
    super({
      emailField: 'email',
      passwordField: 'password',
    });
  }
}
