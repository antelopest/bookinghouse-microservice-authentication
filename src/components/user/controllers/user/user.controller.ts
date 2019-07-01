import {
  Controller,
  Put,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Res,
  HttpStatus,
  UseGuards, Req, Logger, Param, Delete, Headers, HttpCode, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags, ApiBearerAuth, ApiImplicitQuery, ApiImplicitBody } from '@nestjs/swagger';
import { UserService } from '../../user.service';
import { ProfileDto } from '../../dto/profile.dto';
import { PassportDetailsDto } from '../../dto/passport-details.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('Пользователь')
@Controller('user')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private userService: UserService) { }

  @Get('/attributes/profile')
  @HttpCode(200)
  @ApiOperation({
    title: 'Получить профиль пользователя',
    description: 'Получить профиль пользователя',
  })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  async getUserProfile(@Req() req: any, @Res() res: any) {
    res.json({ profile: await this.userService.readUserProfile(req.user._id) });
  }

  @Get('/attributes/passport_details')
  @HttpCode(200)
  @ApiOperation({
    title: 'Получить паспортные данные пользователя',
    description: 'Получить паспортные данные пользователя',
  })
  async getUserPassportDetails(@Req() req: any, @Res() res: any) {
    res.json({ passportDetails: await this.userService.readUserPassportDetails(req.user._id) });
  }

  @Put('/attributes/passport_details')
  @HttpCode(200)
  @ApiOperation({
    title: 'Изменить паспортные данные пользователя',
    description: 'Изменить паспортные данные пользователя',
  })
  async putUserPassportDetails(@Req() req: any, @Res() res: any, @Body() passportDetailsDto: PassportDetailsDto) {
    res.json({ passportDetails: await this.userService.updateUserPassportDetails(req.user._id, passportDetailsDto)});
  }

  @Put('/attributes/profile')
  @HttpCode(200)
  @ApiOperation({
    title: 'Изменить данные профиля пользователя',
    description: 'Изменить паспортные данные пользователя',
  })
  async putUserProfile(@Req() req: any, @Res() res: any, @Body() profileDto: ProfileDto) {
    Logger.log(profileDto);
    res.json({ profile: await this.userService.updateUserProfile(req.user._id, profileDto)});
  }
}
