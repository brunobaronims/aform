import { ApiProperty } from '@nestjs/swagger';

import { PaginatedResponse } from '@/libs/interfaces/response';
import { PostResponseDto } from './post.response.dto';

export class PostPaginatedResponseDto
  implements PaginatedResponse<PostResponseDto>
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

  @ApiProperty({ type: PostResponseDto, isArray: true })
  readonly data!: readonly PostResponseDto[];
}
