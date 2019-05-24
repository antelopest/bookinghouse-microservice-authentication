import {ApiModelProperty } from '@nestjs/swagger';

export class LoginLocalUserDto {
  @ApiModelProperty()
  readonly email: string;

  @ApiModelProperty()
  readonly password: string;
}