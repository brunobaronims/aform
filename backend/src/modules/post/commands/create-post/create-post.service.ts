import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { PostEntity } from '../../domain/post.entity';
import { CreatePostCommand } from './create-post.command';
import { PostRepositoryPort } from '../../database/post.repository.port';
import { POST_REPOSITORY } from '../../post.di-tokens';

@CommandHandler(CreatePostCommand)
export class CreatePostService implements ICommandHandler {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly PostRepo: PostRepositoryPort
  ) {}

  async execute(command: CreatePostCommand): Promise<string> {
    const post = PostEntity.create({
      description: command.description,
      handle: command.handle,
      userId: command.userId
    });

    try {
      await this.PostRepo.createPost(post);

      return post.id;
    } catch (e: unknown) {
      throw e;
    }
  }
}
