import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  IsStrongPassword,
  MaxLength,
  MinLength
} from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty({
    example: 'john@gmail.com',
    description: 'User email address'
  })
  @MaxLength(100)
  @MinLength(5)
  @IsEmail()
  readonly email!: string;

  @ApiProperty({ example: 'JohnDoe', description: 'User handle' })
  @MaxLength(50)
  @IsString()
  @Matches(/^\S*$/)
  readonly handle!: string;

  @ApiProperty({ example: 'Password123*', description: 'User password' })
  @MinLength(6)
  @IsStrongPassword()
  readonly password!: string;
}
