import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  IsStrongPassword,
  MaxLength,
  MinLength,
  IsOptional
} from 'class-validator';

export class UpdateUserRequestDto {
  @ApiProperty({
    example: 'john@gmail.com',
    description: 'User email address'
  })
  @MaxLength(100)
  @MinLength(5)
  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @ApiProperty({ example: 'JohnDoe', description: 'User handle' })
  @MaxLength(50)
  @IsString()
  @Matches(/^\S*$/)
  @IsOptional()
  readonly handle?: string;

  @ApiProperty({ description: 'User password' })
  @MinLength(6)
  @IsStrongPassword()
  @IsOptional()
  readonly password?: string;
}
