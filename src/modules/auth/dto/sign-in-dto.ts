import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @ApiProperty()
  readonly password: string;
}
