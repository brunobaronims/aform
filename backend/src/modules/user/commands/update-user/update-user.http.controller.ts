import {
  Body,
  Controller,
  HttpStatus,
  Put,
  Param,
  UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';

import { UpdateUserCommand } from './update-user.command';
import { UpdateUserRequestDto } from './update-user.request.dto';
import UserNotFoundError from '@/libs/api/errors/not-found.error';
import BadRequestError from '@/libs/api/errors/bad-request.error';

@ApiTags('user')
@Controller()
export class UpdateUserHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Put('/user/:id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: HttpStatus.OK
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
    type: UserNotFoundError
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: BadRequestError
  })
  async update(
    @Body() body: UpdateUserRequestDto,
    @Param('id') id: string
  ): Promise<string> {
    const command = new UpdateUserCommand({
      data: body,
      userId: id
    });

    const result: string = await this.commandBus.execute(command);

    return result;
  }
}
