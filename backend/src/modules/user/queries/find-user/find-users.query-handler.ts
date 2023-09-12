import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/config/database.config';
import { UserResponseDto } from '../../dtos/user.response.dto';
import { PaginatedResponse } from '@/libs/interfaces/response';

export class FindUsersQuery {
  page?: number;

  take?: number;

  cursor?: Prisma.UserWhereUniqueInput;

  where?: Prisma.UserWhereInput;

  orderBy?: Prisma.UserOrderByWithRelationInput;

  constructor(props: FindUsersQuery) {
    this.cursor = props.cursor;
    this.page = props.page;
    this.take = props.take;
    this.orderBy = props.orderBy;
    this.where = props.where;
  }
}

@QueryHandler(FindUsersQuery)
export class FindUsersQueryHandler implements IQueryHandler {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    query: FindUsersQuery
  ): Promise<PaginatedResponse<UserResponseDto>> {
    const { page, take, cursor, where, orderBy } = query;
    if (where?.email)
      where.email = where?.email?.toString().toLocaleLowerCase();

    const lastPage = page ? page - 1 : 0;

    const skip = lastPage * (take || 0);

    const records = await this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy: orderBy || {
        createdAt: 'asc'
      },
      select: {
        email: true,
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
