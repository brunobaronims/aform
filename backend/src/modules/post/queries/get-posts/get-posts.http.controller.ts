import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GetPostsQuery } from './get-posts.query-handler';
import { PostPaginatedResponseDto } from '../../dtos/post.paginated.response.dto';
import { PostPaginatedQueryRequestDto } from '../../dtos/post.paginated-query.request.dto';
import { PaginatedResponse } from '@/libs/interfaces/response';
import { PostResponseDto } from '../../dtos/post.response.dto';
import InternalServerError from '@/libs/api/errors/internal-server.error';

@ApiTags('post')
@Controller()
export class GetPostsHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('/post')
  @ApiOperation({ summary: 'Get posts' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Fetch successful',
    type: PostPaginatedResponseDto
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
    type: InternalServerError
  })
  async getUsers(
    @Query() queryParams: PostPaginatedQueryRequestDto
  ): Promise<PostPaginatedResponseDto> {
    const query = new GetPostsQuery({
      where: {
        handle: {
          contains: queryParams?.handle
        },
        description: {
          contains: queryParams?.description
        }
      },
      take: queryParams?.take,
      cursor: queryParams?.cursor,
      page: queryParams?.page
    });

    const result: PaginatedResponse<PostResponseDto> =
      await this.queryBus.execute(query);

    return result;
  }
}
