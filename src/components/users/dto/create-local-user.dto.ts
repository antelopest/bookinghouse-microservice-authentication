import {ApiModelProperty } from '@nestjs/swagger';
import { } from 'class-va'
export class CreateLocalUserDto {
  @ApiModelProperty()
  readonly email: string;

  @ApiModelProperty()
  readonly password: string;
}