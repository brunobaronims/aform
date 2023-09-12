import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CreateUserHttpController } from './commands/create-user/create-user.http.controller';
import { CreateUserService } from './commands/create-user/create-user.service';
import { UserMapper } from './user.mapper';
import { USER_REPOSITORY } from './user.di-tokens';
import { PRISMA_ERROR_HANDLER } from '@/libs/di-tokens';
import { UserRepository } from './database/user.repository';
import { PrismaService } from '@/config/database.config';
import { PrismaErrorHandler } from '@/libs/database/prisma.error.handler';
import { FindUsersQueryHandler } from './queries/find-user/find-users.query-handler';
import { FindUsersHttpController } from './queries/find-user/find-users.http.controller';
import { DeleteUserHttpController } from './commands/delete-user/delete-user.http.controller';
import { DeleteUserService } from './commands/delete-user/delete-user.service';
import { UpdateUserHttpController } from './commands/update-user/update-user.http.controller';
import { UpdateUserService } from './commands/update-user/update-user.service';
import { UserLoginHttpController } from './queries/user-login/user-login.http.controller';
import { UserLoginQueryHandler } from './queries/user-login/user-login.query-handler';

const httpControllers = [
  CreateUserHttpController,
  FindUsersHttpController,
  DeleteUserHttpController,
  UpdateUserHttpController,
  UserLoginHttpController
];

const errorHandlers: Provider[] = [
  { provide: PRISMA_ERROR_HANDLER, useClass: PrismaErrorHandler }
];

const queryHandlers: Provider[] = [
  FindUsersQueryHandler,
  UserLoginQueryHandler
];

const commandHandlers: Provider[] = [
  CreateUserService,
  DeleteUserService,
  UpdateUserService
];

const mappers: Provider[] = [UserMapper];

const repositories: Provider[] = [
  { provide: USER_REPOSITORY, useClass: UserRepository }
];

@Module({
  imports: [CqrsModule],
  controllers: [...httpControllers],
  providers: [
    Logger,
    PrismaService,
    ...repositories,
    ...commandHandlers,
    ...errorHandlers,
    ...queryHandlers,
    ...mappers
  ]
})
export class UserModule {}
