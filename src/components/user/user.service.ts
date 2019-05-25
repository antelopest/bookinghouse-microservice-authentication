import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  // async createLocalUser() {

  // }

  // async createGoogleUser() {

  // }

  // async createFacebookUser() {

  // }

  async readUsers() {
    const users = this.userModel.find({});
    return users;
  }

  // async readUser() {

  // }

  // async readUserEmail() {

  // }

  // async readUserId() {

  // }

  // async updatePassword() {

  // }

  // async updateProfile() {

  // }

  // async updatePassportDetails() {

  // }

  // async deleteUsers() {

  // }

  // async deleteUserId() {

  // }
}
