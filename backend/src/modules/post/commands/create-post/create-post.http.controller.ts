import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';

import { CreatePostCommand } from './create-post.command';
import { CreatePostRequestDto } from './create-post.request.dto';
import BadRequestError from '@/libs/api/errors/bad-request.error';
import InternalServerError from '@/libs/api/errors/internal-server.error';
import { AuthGuard } from '@/libs/guards/auth.guard';
import { AuthenticatedRequest } from '@/libs/interfaces/authenticated-request';
import UnauthorizedError from '@/libs/api/errors/unauthorized.error';

@ApiTags('post')
@Controller()
export class CreatePostHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(AuthGuard)
  @Post('/post')
  @ApiOperation({ summary: 'Create a post' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Post created'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Description is too long',
    type: BadRequestError
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong!',
    type: InternalServerError
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized user',
    type: UnauthorizedError
  })
  async create(
    @Body() body: CreatePostRequestDto,
    @Request() req: AuthenticatedRequest
  ): Promise<string> {
    const command = new CreatePostCommand({
      description: body.description,
      handle: req.user.handle,
      userId: req.user.id
    });

    const result: string = await this.commandBus.execute(command);

    return result;
  }
}
