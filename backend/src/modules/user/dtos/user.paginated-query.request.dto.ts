import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  Max,
  Min,
  MaxLength,
  IsString,
  Matches,
  IsEmail
} from 'class-validator';

export class UserPaginatedQueryRequestDto {
  @IsOptional()
  @MaxLength(50)
  @IsString()
  @Matches(/^\S*$/)
  @ApiProperty({
    example: 'JohnDoe',
    description: 'User handle',
    required: false
  })
  readonly handle?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({
    example: 'johndoe@gmail.com',
    description: 'User email',
    required: false
  })
  readonly email?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(99999)
  @Type(() => Number)
  @ApiProperty({
    example: 10,
    description: 'Records per page',
    required: false
  })
  readonly take?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(99999)
  @Type(() => Number)
  @ApiProperty({ example: 0, description: 'Page number', required: false })
  readonly page?: number;

  @IsOptional()
  @ApiProperty({
    example: 0,
    description: 'Cursor for pagination',
    required: false
  })
  readonly cursor?: Prisma.UserWhereUniqueInput;
}
