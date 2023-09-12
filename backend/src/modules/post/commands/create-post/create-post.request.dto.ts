import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength
} from 'class-validator';

export class CreatePostRequestDto {
  @ApiProperty({
    example: 'Hello world',
    description: 'Post content'
  })
  @MaxLength(100)
  @MinLength(5)
  readonly description!: string;

  @ApiProperty({ example: 'JohnDoe', description: 'Post owner handle' })
  @MaxLength(50)
  @IsString()
  @Matches(/^\S*$/)
  readonly handle!: string;

  @ApiProperty({
    example: '56a9c7c2-3cee-4c5f-bd86-5b808b11dac6',
    description: 'Post owner ID'
  })
  @IsUUID()
  readonly userId!: string;
}
