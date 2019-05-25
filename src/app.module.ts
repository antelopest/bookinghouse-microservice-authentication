import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './components/auth/auth.module';
import { UserModule } from './components/user/user.module';
import { UserController } from './components/user/user.controller';
import { AuthController } from './components/auth/auth.controller';
import { UserService } from './components/user/user.service';
import { AuthService } from './components/auth/auth.service';

const MONGO_URI: string = 'mongodb://antelope:antelope19@ds147946.mlab.com:47946/db_test';
const DB_SETTINGS: object = {
  useCreateIndex: true,
  useNewUrlParser: true,
};

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URI, DB_SETTINGS),
    AuthModule,
    UserModule,
  ],
  controllers: [
    AppController,
    UserController,
    AuthController,
  ],
  providers: [
    AuthService,
    UserService,
    AppService,
  ],
})
export class AppModule {}
