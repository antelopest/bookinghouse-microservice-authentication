import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

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
