import { Controller, Post, Put, Body, UsePipes, ValidationPipe, Get, Res, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';

import { UserService } from './user.service';

import { PassportDetailsDto, ProfileDto } from './dto/profile.dto';

@ApiUseTags('users')
@Controller('users')
export class UserController {
  constructor(private usersService: UserService) {}

  @Get()
  @ApiOperation({ title: 'Get users' })
  async getUsers(@Res() res: any) {
    const users = await this.usersService.readUsers();
    res.status(HttpStatus.FOUND).json({
      allUsers: users,
    });
  }

  @Get(':id')
  @ApiOperation({ title: 'Get user by id'})
  async getUserBy() {
    return 'User by id';
  }

  @Get('/email/:email')
  @ApiOperation({ title: 'Get user by email' })
  async getUserByEmail() {
    return 'User by email';
  }

  @Put('/profile')
  @UsePipes(ValidationPipe)
  @ApiOperation({ title: 'Put profile'})
  @ApiResponse({
    status: 200,
    description: 'Profile updated',
  })
  async putProfile(@Body() profileDto: ProfileDto) {
    return '123';
  }

  @Put('/profile/passportdetails')
  @ApiOperation({ title: 'Put passport details'})
  @ApiResponse({
    status: 200,
    description: 'Passport details updated',
  })
  @UsePipes(ValidationPipe)
  async putPassportDetails(@Body() passportDetailsDto: PassportDetailsDto) {
    return '123';
  }
}
