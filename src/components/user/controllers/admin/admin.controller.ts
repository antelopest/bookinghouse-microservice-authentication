import { Controller, UseGuards, Get, HttpCode, Req, Res, HttpStatus, Param, Delete } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../../user.service';

@ApiUseTags('Администратор')
@Controller('users')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class AdminController {
  constructor(private usersService: UserService) {}

  @Get('/count')
  @HttpCode(200)
  @ApiOperation({
    title: 'Получить количество пользователей системы',
    description: 'Получить количество пользователей системы',
  })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  async getCountAllUsers(@Res() res: any) {
    res.status(HttpStatus.OK).json({
      count: await this.usersService.readCountAllUsers(),
    });
  }

  @Get('/')
  @HttpCode(200)
  @ApiOperation({
    title: 'Получить всех пользователей системы',
    description: 'Получить всех пользователей системы',
  })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  async getUsers(@Res() res: any, @Req() req: any) {
    res.json({
      users: await this.usersService.readUsers(),
    });
  }

  @Get('/email/:user_email')
  @HttpCode(200)
  @ApiOperation({
    title: 'Получить пользователя по электронной почте',
    description: 'Получить пользователя по электронной почте',
  })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  async getUserByEmail(@Param('user_email') email: string, @Res() res: any) {
    res.json({
      user: await this.usersService.readUserByEmail(email),
    });
  }

  @Get('/id/:user_id')
  @HttpCode(200)
  @ApiOperation({
    title: 'Получить пользователя по id',
    description: 'Получить пользователя по id',
  })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  async getUserById(@Param('user_id') id: string, @Res() res: any) {
    res.json({
      user: await this.usersService.readUserById(id),
    });
  }

  @Delete()
  @HttpCode(200)
  @ApiOperation({
    title: 'Удалить всех пользователей',
    description: 'Удалить всех пользователей',
  })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  async deleteUsers(@Res() res: any) {
    res.json({
      users: await this.usersService.deleteUsers(),
    });
  }

  @Delete('/id/:user_id')
  @HttpCode(200)
  @ApiOperation({
    title: 'Удалить пользователя по id',
    description: 'Удалить пользователя по id',
  })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  async deleteUserById(@Param('user_id') id: string, @Res() res: any) {
    res.json({
      user: await this.usersService.deleteUserId(id),
    });
  }

}
