import { ApiModelProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty } from 'class-validator';

export class PassportDetailsDto {
  @ApiModelProperty()
  readonly nationality: string;

  @ApiModelProperty()
  readonly series: string;

  @ApiModelProperty()
  readonly number: string;

  @ApiModelProperty()
  readonly whoIssued: string;

  @ApiModelProperty()
  readonly whenIssued: string;

  @ApiModelProperty()
  readonly codeSubdivision: string;
}

export class ProfileDto {
  @ApiModelProperty()
  @IsNotEmpty()
  readonly surname: string;

  @ApiModelProperty()
  @IsNotEmpty()
  readonly name: string;

  @ApiModelProperty()
  @IsNotEmpty()
  readonly patronymic: string;

  @ApiModelProperty()
  @IsDate()
  readonly date: string;

  @ApiModelProperty()
  readonly passportDetails: PassportDetailsDto;
}

export class UserDto {
  @ApiModelProperty()
  readonly profile: ProfileDto;
}

