import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';

import { CreateUserCommand } from './create-user.command';
import { CreateUserRequestDto } from './create-user.request.dto';
import ConflictError from '@/libs/api/errors/conflict.error';
import BadRequestError from '@/libs/api/errors/bad-request.error';
import InternalServerError from '@/libs/api/errors/internal-server.error';

@ApiTags('user')
@Controller()
export class CreateUserHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/user/new')
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created'
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User already exists',
    type: ConflictError
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid user information',
    type: BadRequestError
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong!',
    type: InternalServerError
  })
  async create(@Body() body: CreateUserRequestDto): Promise<string> {
    const command = new CreateUserCommand(body);

    const result: string = await this.commandBus.execute(command);

    return result;
  }
}
