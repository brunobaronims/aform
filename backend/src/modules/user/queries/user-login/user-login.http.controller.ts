import {
  Controller,
  Post,
  HttpStatus,
  Body
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserLoginQuery } from './user-login.query-handler';
import { UserLoginRequestDto } from './user-login.request.dto';
import UnauthorizedError from '@/libs/api/errors/unauthorized.error';
import InternalServerError from '@/libs/api/errors/internal-server.error';

@ApiTags('user')
@Controller()
export class UserLoginHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @Post('/user')
  @ApiOperation({ summary: 'Log a user in' })
  @ApiResponse({
    description: 'Login successful',
    status: HttpStatus.CREATED
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid user credentials',
    type: UnauthorizedError
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
    type: InternalServerError
  })
  async login(
    @Body() body: UserLoginRequestDto
  ) {
    const query = new UserLoginQuery(body);

    const result: string = await this.queryBus.execute(query);

    return result;
  }
}
