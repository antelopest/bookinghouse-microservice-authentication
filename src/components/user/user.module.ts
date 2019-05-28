import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserSchema } from './schemas/user.schema';
import { UserController } from './controllers/user/user.controller';
import { AdminController } from './controllers/admin/admin.controller';
import { ClientController } from './controllers/client/client.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController, AdminController, ClientController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
