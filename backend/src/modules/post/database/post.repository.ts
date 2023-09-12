import { Inject, Injectable, Logger } from '@nestjs/common';
import { Prisma, Post } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { LoggerPort } from '@/libs/ports/logger.port';
import { PostEntity } from '../domain/post.entity';
import { PrismaService } from '@/config/database.config';
import { PostMapper } from '../post.mapper';
import { PostRepositoryPort } from './post.repository.port';
import { PRISMA_ERROR_HANDLER } from '@/libs/di-tokens';
import { ErrorHandler } from '@/libs/exception';

@Injectable()
export class PostRepository implements PostRepositoryPort {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly prisma: PrismaService,
    @Inject(PRISMA_ERROR_HANDLER)
    private readonly errorHandler: ErrorHandler
  ) {}

  private readonly mapper = new PostMapper();

  private readonly logger: LoggerPort = new Logger(PostRepository.name);

  async post(where: Prisma.PostWhereUniqueInput): Promise<PostEntity | null> {
    const result = await this.prisma.post.findUnique({
      where
    });
    if (result) return this.mapper.toDomain(result);
    return null;
  }

  async posts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<PostEntity[]> {
    const { skip, take, cursor, where, orderBy } = params;

    const result = await this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy
    });
    return result.map(this.mapper.toDomain);
  }

  async createPost(entity: PostEntity): Promise<Post | undefined> {
    this.logger.debug(`Writing entry ${entity.id} to Posts`);

    const record = this.mapper.toPersistence(entity);

    try {
      const result = await this.prisma.post.create({
        data: record
      });

      entity.publishEvents(this.logger, this.eventEmitter, entity.id);

      return result;
    } catch (e: unknown) {
      this.errorHandler.handle(e);
    }
  }

  async updatePost(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
    entity: PostEntity;
  }): Promise<Post> {
    const { where, entity, data } = params;

    const result = this.prisma.post.update({
      data,
      where
    });

    entity.publishEvents(this.logger, this.eventEmitter, entity.id);

    return result;
  }

  async deletePost(entity: PostEntity): Promise<Post> {
    this.logger.debug(`Deleting entry ${entity.id} from Posts`);

    const result = await this.prisma.post.delete({
      where: {
        id: entity.id
      }
    });

    entity.publishEvents(this.logger, this.eventEmitter, entity.id);

    return result;
  }
}
