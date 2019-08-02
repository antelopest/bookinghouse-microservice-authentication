import {ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateLocalUserDto {
  @ApiModelProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiModelProperty()
  @IsNotEmpty()
  readonly dateOfBirth: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly surname: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiModelProperty()
  @IsNotEmpty()
  readonly password: string;
}
