import { ApiProperty } from '@nestjs/swagger';
import {
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
}
