import { ApiProperty } from '@nestjs/swagger';

import { ApiResponse } from '@/libs/interfaces/response';

export class PostResponseDto implements ApiResponse {
  @ApiProperty({ example: '2cdc8ab1-6d50-49cc-ba14-54e4ac7ec231' })
  readonly id!: string;

  @ApiProperty({ example: '2020-11-24T17:43:15.970Z' })
  readonly createdAt!: Date | null;

  @ApiProperty({ example: '2020-11-24T17:43:15.970Z' })
  readonly updatedAt!: Date | null;

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
