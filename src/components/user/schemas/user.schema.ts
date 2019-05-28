import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  dateCreated: {
    type: Date,
    default: new Date(),
  },
  dateUpdated: {
    type: Date,
    default: new Date(),
  },
  verified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: 'user',
  },
  account: {
    local: {
      email: {
        type: String,
        lowercase: true,
        unique: true,
      },
      password: {
        type: String,
      },
    },
    facebook: {
      id: {
        type: String,
      },
      token: {
        type: String,
      },
      name: {
        type: String,
      },
      email: {
        type: String,
      },
    },
    google: {
      id: {
        type: String,
      },
      token: {
        type: String,
      },
      name: {
        type: String,
      },
      email: {
        type: String,
      },
    },
  },
  profile: {
    surname: {
      type: String,
    },
    name: {
      type: String,
    },
    patronymic: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
  },
  passportDetails: {
    nationality: {
      type: String,
    },
    series: {
      type: String,
    },
    number: {
      type: String,
    },
    whoIssued: {
      type: String,
    },
    whenIssued: {
      type: String,
    },
    codeSubdivision: {
      type: String,
    },
  },
});
