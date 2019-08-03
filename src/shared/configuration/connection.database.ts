import * as dotenv from 'dotenv';

export interface СonfigDataBase {
  DATABASE_URI: string;
  MONGOOSE_SETTINGS: {
    useCreateIndex?: any,
    useNewUrlParser?: any,
    useFindAndModify?: any,
  };
}

export async function configurationDatabase() {
  await dotenv.config();
  const db: СonfigDataBase = {
    DATABASE_URI: process.env.DATABASE_URI,
    MONGOOSE_SETTINGS: {
      useCreateIndex: process.env.MONGOOSE_USECREATEINDEX,
      useNewUrlParser: process.env.MONGOOSE_USENEWURLPARSER,
      useFindAndModify: process.env.MONGOOSE_USEFINDANDMODIFY,
    },
  };
  return await db;
}
