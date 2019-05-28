import { Injectable, Inject, UnauthorizedException, Logger } from '@nestjs/common';
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

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectModel('User') private readonly userModel: Model<IUser>,
    ) {}

  async createLocalUser(createLocalUserDto: CreateLocalUserDto): Promise<IStatus> {
    const foundUser = await this.userModel.findOne({ 'account.local.email': createLocalUserDto.email });
    if (foundUser) {
      const status: IStatus = { success: false, message: 'User exits' };
      return status;
    } else {
      const newUser = new this.userModel();
      newUser.account.local.email = createLocalUserDto.email;
      newUser.account.local.password = await this.getHashPassword(createLocalUserDto.password);
      newUser.profile.dateOfBirth = createLocalUserDto.dateOfBirth;
      newUser.profile.surname = createLocalUserDto.surname;
      newUser.profile.name = createLocalUserDto.name;
      await newUser.save();
      const status: IStatus = { success: true, message: 'User created' };
      return status;
    }
  }

  async createToken(user: IUser) {
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

  async getHashPassword(password: string | undefined): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async compareHash(password: string | undefined, hash: string | undefined): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
