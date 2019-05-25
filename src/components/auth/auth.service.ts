import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';

import { IJwtPayload } from './interfaces/payload.interface';
import { IUser } from '../user/interfaces/user.interface';
import { IStatus } from './interfaces/status.interface';

import { CreateLocalUserDto } from './dto/create-local-user.dto';
import { stat } from 'fs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @InjectModel('User') private readonly userModel: Model<IUser>,
    ) {}

  /*
    {
      "email": "webantelope@gmail.com",
      "dateOfBirth": "11.03.1993",
      "surname": "Беленко",
      "name": "Семен",
      "password": "mescalito"
    }
  */

  async createLocalUser(createLocalUserDto: CreateLocalUserDto): Promise<IStatus> {
    const foundUser = await this.userModel.findOne({ 'account.local.email': createLocalUserDto.email });
    if (foundUser) {
      const status: IStatus = { success: false, message: 'User exits' };
      return status;
    } else {
      const hash = await bcrypt.hash(createLocalUserDto.password, 10);
      const newUser = new this.userModel();
      newUser.account.local.email = createLocalUserDto.email;
      newUser.account.local.password = hash;
      newUser.profile.dateOfBirth = createLocalUserDto.dateOfBirth;
      newUser.profile.surname = createLocalUserDto.surname;
      newUser.profile.name = createLocalUserDto.name;
      await newUser.save();
      const status: IStatus = { success: true, message: 'User created' };
      return status;
    }
  }

  async createToken(user: IUser) {
    const expiresIn = 3600;
    const payload: IJwtPayload = {
      userId: '123', // user.id,
      email: 'my@mail.ru', // user.account.local.email,
      role: 'user', // user.role,
    };
    const secret = 'mySecret';
    const accessToken = jwt.sign(payload, secret, {expiresIn});
    return {
      expiresIn,
      accessToken,
    };
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
