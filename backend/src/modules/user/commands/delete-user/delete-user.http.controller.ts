import { Controller, Delete, HttpStatus, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { DeleteUserCommand } from './delete-user.service';
import UserNotFoundError from '@/libs/api/errors/not-found.error';
import InternalServerError from '@/libs/api/errors/internal-server.error';

@ApiTags('user')
@Controller()
export class DeleteUserHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({
    description: 'User deleted',
    status: HttpStatus.OK
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
    type: UserNotFoundError
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong',
    type: InternalServerError
  })
  @Delete('/user/:id')
  async delete(@Param('id') id: string): Promise<void> {
    const command = new DeleteUserCommand({ userId: id });

    await this.commandBus.execute(command);
  }
}
