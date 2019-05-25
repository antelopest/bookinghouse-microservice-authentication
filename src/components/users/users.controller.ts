import { Controller, Post, Put, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { PassportDetailsDto, ProfileDto } from './dto/profile.dto';

@ApiUseTags('users')
@Controller('users')
export class UsersController {
  constructor (private usersService: UsersService) {}

  @Put('/profile')
  @UsePipes(ValidationPipe)
  @ApiOperation({ title: 'Put profile'})
  @ApiResponse({
    status: 200,
    description: 'Profile updated'
  })
  async updateProfile(@Body() profileDto: ProfileDto) {

  }


  @Put('/profile/passportdetails')
  @ApiOperation({ title: 'Put passport details'})
  @ApiResponse({
    status: 200,
    description: 'Passport details updated'
  })
  @UsePipes(ValidationPipe)
  async updatePassportDetails(@Body() passportDetailsDto: PassportDetailsDto) {

  }
}
