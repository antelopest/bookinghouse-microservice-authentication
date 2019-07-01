import { Controller, Post, Get, Body, Res, HttpStatus, Put, Logger, HttpCode, Param, Query } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { CreateLocalUserDto } from './dto/create-local-user.dto';
import { LoginLocalUserDto } from './dto/login-local-user.dto';
import { UserService } from '../user/user.service';
import { BcryptService } from './bcrypt.service';
import { IStatus } from './interfaces/status.interface';

@ApiUseTags('Аутентификация')
@Controller('authentication')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private bcryptService: BcryptService,
    ) {}

  @Post('/google/login')
  @HttpCode(200)
  @ApiOperation({
    title: 'Сторонняя аутентификация через Google OAuth 2.0',
    description: 'Сторонняя аутентификация через Google OAuth 2.0',
  })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  async LoginGoogleUser(@Res() res: any) {
    res.json({ message: 'Сторонняя аутентификация через Google OAuth 2.0' });
  }

  @Post('/facebook/login')
  @HttpCode(200)
  @ApiOperation({
    title: 'Сторонняя аутентификация через Facebook OAuth 2.0',
    description: 'Сторонняя аутентификация через Facebook OAuth 2.0',
  })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  async LoginFacebookUser(@Res() res: any) {
    res.json({ message: 'Сторонняя аутентификация через Facebook OAuth 2.0' });
  }

  @Post('/vk/login')
  @HttpCode(200)
  @ApiOperation({
    title: 'Сторонняя аутентификация через Vk OAuth 2.0',
    description: 'Сторонняя аутентификация через Vk OAuth 2.0',
  })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  async LoginVkUser(@Res() res: any) {
    res.json({ message: 'Сторонняя аутентификация через Vk OAuth 2.0' });
  }

  @Post('/local/login')
  @HttpCode(200)
  @ApiOperation({
    title: 'Аутентификация через локальную учетную запись',
    description: 'Аутентификация через локальную учетную запись',
  })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  async LoginLocalUser(
    @Res() res: any,
    @Body() loginLocalUserDto: LoginLocalUserDto,
  ) {
    const foundUser = await this.userService.readUserByEmail(loginLocalUserDto.email);
    if (foundUser) {
      const comparePassword = await this.bcryptService.compareHash(loginLocalUserDto.password, foundUser.account.local.password);
      if (comparePassword) {
        res.json({
          done: true,
          token: await this.authService.createToken(foundUser),
        });
      } else {
        res.json({
          done: false,
          message: 'Password invalid',
        });
      }
    }
  }

  @Post('/local/registration')
  @HttpCode(200)
  @ApiOperation({
    title: 'Регистрация локальной учетной записи в системе',
    description: 'Регистрация локальной учетной записи в системе',
  })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  async RegisterLocalUser(
    @Res() res: any,
    @Body() createLocalUserDto: CreateLocalUserDto,
  ) {
    const status: IStatus = await this.authService.createLocalUser(createLocalUserDto);
    (status.done) ? res.status(HttpStatus.CREATED).json({
      done: status.done,
      token: status.token,
      message: status.message,
    }) : res.status(HttpStatus.BAD_REQUEST).json({
      done: status.done,
      message: status.message,
    });
  }

  @Put('/:user_id/attributes/password')
  @HttpCode(200)
  @ApiOperation({
    title: 'Изменение пароля локальной учетной записи',
    description: 'Изменение пароля локальной учетной записи',
  })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  async ChangeLocalUserEmail(@Res() res: any) {
    res.json({
      message: 'Изменения пароля учетной записи',
    });
  }

  @Put('/:user_id/attributes/email')
  @HttpCode(200)
  @ApiOperation({
    title: 'Изменение электронной почты локальной учетной записи',
    description: 'Изменение электронной почты локальной учетной записи',
  })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  async ChangeLocalUserPassword(@Res() res: any) {
    res.json({
      message: 'Изменения электронной почты локальной учетной записи',
    });
  }
}
