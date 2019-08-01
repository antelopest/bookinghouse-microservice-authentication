import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';

import { IJwtPayload } from './interfaces/payload.interface';
import { IUser } from '../user/interfaces/user.interface';
import { IStatus } from './interfaces/status.interface';

import { CreateLocalUserDto } from './dto/create-local-user.dto';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from './bcrypt.service';

export enum Provider {
  GOOGLE = 'google',
  /*
  FACEBOOK = 'facebook',
  VKONTAKTE = 'vkontakte',
  LOCAL = 'local',
  */
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
    @InjectModel('User') private readonly userModel: Model<IUser>,
    ) {}

  async createLocalUser(createLocalUserDto: CreateLocalUserDto): Promise<IStatus> {
    const foundUser = await this.userModel.findOne({ 'account.local.email': createLocalUserDto.email });
    if (foundUser) {
      return { done: false, message: 'User exists' };
    } else {
      const newUser = new this.userModel();
      newUser.account.local.email = createLocalUserDto.email;
      newUser.account.local.password = await this.bcryptService.getHashPassword(createLocalUserDto.password);
      newUser.profile.dateOfBirth = createLocalUserDto.dateOfBirth;
      newUser.profile.surname = createLocalUserDto.surname;
      newUser.profile.name = createLocalUserDto.name;
      if (await newUser.save()) {
        return {
          done: true,
          message: 'User created',
          token: await this.createToken(newUser),
        }
      } else {
      }
    }
  }

  async createToken(user: IUser): Promise<any> {
    const expiresIn = '7d';
    const payload: IJwtPayload = {
      userId: user.id,
      role: user.role,
    };
    const secret = 'mySecret';
    const token = jwt.sign(payload, secret, {expiresIn});
    return token;
  }

  async validateUser(payload: IJwtPayload): Promise<any> {
    return await this.userModel.findById(payload.userId);
  }

  async login(email: string, password: string) {
    const foundUser = await this.userModel.findOne({ 'account.local.email': email });
    if (foundUser) {
      return await bcrypt.compare(password, foundUser.account.local.password)
      ? Promise.resolve(foundUser) : Promise.reject(new UnauthorizedException('Password invalid'));
    }
  }
}
