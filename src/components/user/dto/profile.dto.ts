import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ProfileDto {
  @ApiModelProperty({ description: 'Фамилия'})
  @IsNotEmpty()
  readonly surname: string;

  @ApiModelProperty({ description: 'Имя'})
  @IsNotEmpty()
  readonly name: string;

  @ApiModelProperty({ description: 'Отчество'})
  @IsNotEmpty()
  readonly patronymic: string;

  @ApiModelProperty({ description: 'Дата рождения'})
  @IsNotEmpty()
  readonly dateOfBirth: string;
}
