import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/config/database.config';
import { PostResponseDto } from '../../dtos/post.response.dto';
import { PaginatedResponse } from '@/libs/interfaces/response';

export class GetPostsQuery {
  page?: number;

  take?: number;

  cursor?: Prisma.PostWhereUniqueInput;

  where?: Prisma.PostWhereInput;

  orderBy?: Prisma.PostOrderByWithRelationInput;

  constructor(props: GetPostsQuery) {
    this.cursor = props.cursor;
    this.page = props.page;
    this.take = props.take;
    this.orderBy = props.orderBy;
    this.where = props.where;
  }
}

@QueryHandler(GetPostsQuery)
export class GetPostsQueryHandler implements IQueryHandler {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    query: GetPostsQuery
  ): Promise<PaginatedResponse<PostResponseDto>> {
    const { page, take, cursor, where, orderBy } = query;

    const lastPage = page ? page - 1 : 0;

    const skip = lastPage * (take || 0);

    const records = await this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy: orderBy || {
        createdAt: 'asc'
      },
      select: {
        description: true,
        handle: true,
        id: true,
        createdAt: true,
        updatedAt: true
      }
    });

    const response = {
      count: records.length,
      take: take,
      data: records,
      page: page
    };

    return response;
  }
}
