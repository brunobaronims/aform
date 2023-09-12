import { Inject, Injectable, Logger } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { LoggerPort } from '@/libs/ports/logger.port';
import { UserEntity } from '../domain/user.entity';
import { PrismaService } from '@/config/database.config';
import { UserMapper } from '../user.mapper';
import { UserRepositoryPort } from './user.repository.port';
import { PRISMA_ERROR_HANDLER } from '@/libs/di-tokens';
import { ErrorHandler } from '@/libs/exception';

@Injectable()
export class UserRepository implements UserRepositoryPort {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly prisma: PrismaService,
    @Inject(PRISMA_ERROR_HANDLER)
    private readonly errorHandler: ErrorHandler
  ) {}

  private readonly mapper = new UserMapper();

  private readonly logger: LoggerPort = new Logger(UserRepository.name);

  async user(where: Prisma.UserWhereUniqueInput): Promise<UserEntity | null> {
    where.email = where.email?.toLocaleLowerCase();

    const result = await this.prisma.user.findUnique({
      where
    });
    if (result) return this.mapper.toDomain(result);
    return null;
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<UserEntity[]> {
    const { skip, take, cursor, where, orderBy } = params;
    if (where) where.email = where?.email?.toString().toLocaleLowerCase();

    const result = await this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy
    });
    return result.map(this.mapper.toDomain);
  }

  async createUser(entity: UserEntity): Promise<User | undefined> {
    this.logger.debug(`Writing entry ${entity.id} to Users`);

    const record = this.mapper.toPersistence(entity);

    try {
      const result = await this.prisma.user.create({
        data: { ...record, email: record.email.toLocaleLowerCase() }
      });

      entity.publishEvents(this.logger, this.eventEmitter, entity.id);

      return result;
    } catch (e: unknown) {
      this.errorHandler.handle(e);
    }
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
    entity: UserEntity;
  }): Promise<User> {
    const { where, entity, data } = params;
    data.email = data.email?.toString().toLocaleLowerCase();

    const result = this.prisma.user.update({
      data,
      where
    });

    entity.publishEvents(this.logger, this.eventEmitter, entity.id);

    return result;
  }

  async deleteUser(entity: UserEntity): Promise<User> {
    this.logger.debug(`Deleting entry ${entity.id} from Users`);

    const result = await this.prisma.user.delete({
      where: {
        id: entity.id
      }
    });

    entity.publishEvents(this.logger, this.eventEmitter, entity.id);

    return result;
  }
}
