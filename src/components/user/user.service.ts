import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interfaces/user.interface';
import { ProfileDto } from 'dist/components/user/dto/profile.dto';

import * as _ from 'lodash';
import { PassportDetailsDto } from 'dist/components/user/dto/passport-details.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) { }

  // async createLocalUser() {

  // }

  // async createGoogleUser() {

  // }

  // async createFacebookUser() {

  // }

  async readUsers() {
    return await this.userModel.find({});
  }

  async readUserByEmail(email: string) {
    return await this.userModel.findOne({ 'account.local.email': email });
  }

  async readCountAllUsers() {
    return await this.userModel.countDocuments({});
  }

  async readUserById(id: string) {
    return await this.userModel.findById(id);
  }

  async readUserProfile(id: string) {
    const foundUser = await this.userModel.findById(id);
    return foundUser.profile;
  }

  async readUserPassportDetails(id: string) {
    const foundUser = await this.userModel.findById(id);
    return foundUser.passportDetails;
  }

  async updateUserPassportDetails(id: string, passportDetailsDto: PassportDetailsDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, { $set: {
      'passportDetails.nationality': passportDetailsDto.nationality,
      'passportDetails.series': passportDetailsDto.series,
      'passportDetails.number': passportDetailsDto.number,
      'passportDetails.whoIssued': passportDetailsDto.whoIssued,
      'passportDetails.whenIssued': passportDetailsDto.whenIssued,
      'passportDetails.codeSubdivision': passportDetailsDto.codeSubdivision,
      'dateUpdated': new Date(),
    }}, { new: true });
    return updatedUser.passportDetails;
  }

  async updateUserProfile(id: string, profileDto: ProfileDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, { $set: {
      'profile.surname': profileDto.surname,
      'profile.name': profileDto.name,
      'profile.patronymic': profileDto.patronymic,
      'profile.dateOfBirth': profileDto.dateOfBirth,
      'dateUpdated': new Date(),
    }}, { new: true });
    return updatedUser.profile;
  }

  // async readUser() {

  // }

  // async readUserEmail() {

  // }

  // async readUserId() {

  // }

  // async updatePassword() {

  // }

  // async updatePassportDetails() {

  // }

  async deleteUsers() {
    return await this.userModel.deleteMany({});
  }

  async deleteUserId(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }
}
