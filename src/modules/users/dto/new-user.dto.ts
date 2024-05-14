import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NewUserDto {
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @IsEmail()
  @ApiProperty()
  readonly email: string;
}
