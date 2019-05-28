import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly _id: string;
  readonly account: {
    local: {
      email: string,
      password: string,
    },
  };
  readonly profile: {
    surname: string;
    name: string;
    patronymic: string;
    dateOfBirth: string;
  };
  readonly passportDetails: {
    nationality: string,
    series: string,
    number: string,
    whoIssued: string,
    whenIssued: string,
    codeSubdivision: string,
  }
  readonly role: string;
  readonly verified: boolean;
  readonly createdDate: string;
  readonly updatedDate: string;
}
