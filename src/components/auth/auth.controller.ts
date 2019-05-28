import { Controller, Post, Get, Body, Res, HttpStatus, Put, Logger, HttpCode, Param, Query } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { CreateLocalUserDto } from './dto/create-local-user.dto';
import { LoginLocalUserDto } from './dto/login-local-user.dto';
import { UserService } from '../user/user.service';
import { BcryptService } from './bcrypt.service';

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
  async LoginGoogleUser() {
    return '123';
  }

  @Post('/facebook/login')
  @HttpCode(200)
  @ApiOperation({
    title: 'Сторонняя аутентификация через Facebook OAuth 2.0',
    description: 'Сторонняя аутентификация через Facebook OAuth 2.0',
  })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  async LoginFacebookUser() {
    return '123';
  }

  @Post('/vk/login')
  @HttpCode(200)
  @ApiOperation({
    title: 'Сторонняя аутентификация через Vk OAuth 2.0',
    description: 'Сторонняя аутентификация через Vk OAuth 2.0',
  })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  async LoginVkUser() {
    return '123';
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
    @Query() loginLocalUserDto: LoginLocalUserDto,
  ) {
    const foundUser = await this.userService.readUserByEmail(loginLocalUserDto.email);
    if (foundUser) {
      const comparePassword = await this.bcryptService.compareHash(loginLocalUserDto.password, foundUser.account.local.password);
      if (comparePassword) {
        const accessToken = await this.authService.createToken(foundUser);
        res.json({
          token: accessToken,
        });
      } else { return 'password invalid'; }
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
    @Query() createLocalUserDto: CreateLocalUserDto,
  ) {
    const status = await this.authService.createLocalUser(createLocalUserDto);
    (status.success) ? res.status(HttpStatus.CREATED).json({
      status,
    }) : res.status(HttpStatus.BAD_REQUEST).json({
      status,
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
  async ChangeLocalUserEmail() {
    return '123';
  }

  @Put('/:user_id/attributes/email')
  @HttpCode(200)
  @ApiOperation({
    title: 'Изменение электронной почты локальной учетной записи',
    description: 'Изменение электронной почты локальной учетной записи',
  })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  async ChangeLocalUserPassword() {
    return '123';
  }
}
