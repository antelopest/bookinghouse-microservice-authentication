import { Controller, Post } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  @Post('/local/register')
  async RegisterLocalUser() {

  }
}
