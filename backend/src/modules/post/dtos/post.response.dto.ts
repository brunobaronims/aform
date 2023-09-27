import { ApiProperty } from '@nestjs/swagger';

export class PostResponseDto {
  @ApiProperty({ example: '2020-11-24T17:43:15.970Z' })
  readonly createdAt!: Date | null;

  @ApiProperty({
    example: 'The absence of evidence',
    description: 'Post description'
  })
  readonly description!: string;

  @ApiProperty({
    example: 'JonDoe',
    description: `Poster's handle`
  })
  readonly handle!: string;
}
