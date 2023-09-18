import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PostMapper } from './post.mapper';
import { PrismaErrorHandler } from '@/libs/database/prisma.error.handler';
import { PRISMA_ERROR_HANDLER } from '@/libs/di-tokens';
import { PrismaService } from '@/config/database.config';
import { PostRepository } from './database/post.repository';
import { POST_REPOSITORY } from './post.di-tokens';
import { CreatePostHttpController } from './commands/create-post/create-post.http.controller';
import { CreatePostService } from './commands/create-post/create-post.service';
import { GetPostsHttpController } from './queries/get-posts/get-posts.http.controller';
import { GetPostsQueryHandler } from './queries/get-posts/get-posts.query-handler';
import { USER_REPOSITORY } from '../user/user.di-tokens';
import { UserRepository } from '../user/database/user.repository';

const httpControllers = [CreatePostHttpController, GetPostsHttpController];

const errorHandlers: Provider[] = [
  { provide: PRISMA_ERROR_HANDLER, useClass: PrismaErrorHandler }
];

const commandHandlers: Provider[] = [CreatePostService];

const queryHandlers: Provider[] = [GetPostsQueryHandler];

const mappers: Provider[] = [PostMapper];

const repositories: Provider[] = [
  { provide: POST_REPOSITORY, useClass: PostRepository },
  { provide: USER_REPOSITORY, useClass: UserRepository }
];

@Module({
  imports: [CqrsModule],
  controllers: [...httpControllers],
  providers: [
    Logger,
    PrismaService,
    ...repositories,
    ...errorHandlers,
    ...commandHandlers,
    ...queryHandlers,
    ...mappers
  ]
})
export class PostModule {}
