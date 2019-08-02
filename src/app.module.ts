import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './middleware/authentication/auth.module';
import { UserModule } from './components/user/user.module';
import { UserController } from './components/user/controllers/user/user.controller';
import { AuthController } from './middleware/authentication/auth.controller';
import { UserService } from './components/user/user.service';
import { AuthService } from './middleware/authentication/auth.service';
import { BcryptService } from './middleware/authentication/bcrypt.service';
import { AdminController } from './components/user/controllers/admin/admin.controller';
import { ClientController } from './components/user/controllers/client/client.controller';
import { configurationDatabase } from './configuration/connection.database';

const configurationDB = configurationDatabase();

@Module({
  imports: [
    MongooseModule.forRoot(configurationDB.DATABASE_URI, configurationDB.MONGOOSE_SETTINGS),
    AuthModule,
    UserModule,
  ],
  controllers: [
    AppController,
    UserController,
    AuthController,
    AdminController,
    ClientController,
  ],
  providers: [
    AuthService,
    UserService,
    BcryptService,
    AppService,
  ],
})
export class AppModule {}
