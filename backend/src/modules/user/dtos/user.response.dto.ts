import { ApiProperty } from '@nestjs/swagger';

import { ApiResponse } from '@/libs/interfaces/response';

export class UserResponseDto implements ApiResponse {
  @ApiProperty({ example: '2cdc8ab1-6d50-49cc-ba14-54e4ac7ec231' })
  readonly id!: string;

  @ApiProperty({ example: '2020-11-24T17:43:15.970Z' })
  readonly createdAt!: Date | null;

  @ApiProperty({ example: '2020-11-24T17:43:15.970Z' })
  readonly updatedAt!: Date | null;

  @ApiProperty({
    example: 'jon-doe@gmail.com',
    description: `User's email address`
  })
  readonly email!: string;

  @ApiProperty({
    example: 'JonDoe',
    description: `User's handle`
  })
  readonly handle!: string;
}
