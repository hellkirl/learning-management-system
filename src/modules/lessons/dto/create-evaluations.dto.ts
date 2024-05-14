import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEvaluationDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  readonly userId: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  readonly score: number;
}
