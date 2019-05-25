import { Controller, Post, Get, Body, Res, HttpStatus } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { CreateLocalUserDto } from './dto/create-local-user.dto';
import { IStatus } from './interfaces/status.interface';

@ApiUseTags('authentication')
@Controller('authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/google/login')
  @ApiOperation({ title: 'Login google user'})
  async LoginGoogleUser() {
    return '123';
  }

  @Post('/local/login')
  @ApiOperation({ title: 'Login local user'})
  async LoginLocalUser() {
    return '123';
  }

  @Post('/local/registration')
  @ApiOperation({ title: 'Registration local user'})
  async RegisterLocalUser(
    @Res() res: any,
    @Body() createLocalUserDto: CreateLocalUserDto,
  ) {
    const status = await this.authService.createLocalUser(createLocalUserDto);
    (status.success) ? res.status(HttpStatus.CREATED).json({
      status,
    }) : res.status(HttpStatus.BAD_REQUEST).json({
      status,
    });
  }
}
