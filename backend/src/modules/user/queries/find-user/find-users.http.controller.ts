import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { FindUsersQuery } from './find-users.query-handler';
import { UserPaginatedResponseDto } from '../../dtos/user.paginated.response.dto';
import { UserPaginatedQueryRequestDto } from '../../dtos/user.paginated-query.request.dto';
import { PaginatedResponse } from '@/libs/interfaces/response';
import { UserResponseDto } from '../../dtos/user.response.dto';

@ApiTags('user')
@Controller()
export class FindUsersHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('/user')
  @ApiOperation({ summary: 'Find users' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserPaginatedResponseDto
  })
  async findUsers(
    @Query() queryParams: UserPaginatedQueryRequestDto
  ): Promise<UserPaginatedResponseDto> {
    const query = new FindUsersQuery({
      where: {
        handle: queryParams?.handle,
        email: queryParams?.email
      },
      take: queryParams?.take,
      cursor: queryParams?.cursor,
      page: queryParams?.page
    });

    const result: PaginatedResponse<UserResponseDto> =
      await this.queryBus.execute(query);

    return result;
  }
}
