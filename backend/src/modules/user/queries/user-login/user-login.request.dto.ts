import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString
} from 'class-validator';

export class UserLoginRequestDto {
  @ApiProperty({
    example: 'john@gmail.com',
    description: 'User email address'
  })
  @IsEmail()
  readonly email!: string;

  @ApiProperty({ example: 'Password123*', description: 'User password' })
  @IsString()
  readonly password!: string;
}
