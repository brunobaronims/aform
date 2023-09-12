import { ApiProperty } from '@nestjs/swagger';

import { PaginatedResponse } from '@/libs/interfaces/response';
import { UserResponseDto } from './user.response.dto';

export class UserPaginatedResponseDto
  implements PaginatedResponse<UserResponseDto>
{
  @ApiProperty({
    example: '5231',
    description: 'Total number of items'
  })
  readonly count?: number;

  @ApiProperty({
    example: 10,
    description: 'Number of items per page'
  })
  readonly take?: number;

  @ApiProperty({
    example: '0',
    description: 'Page number'
  })
  readonly page?: number;

  @ApiProperty({ type: UserResponseDto, isArray: true })
  readonly data!: readonly UserResponseDto[];
}
