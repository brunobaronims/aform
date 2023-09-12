import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConflictException, Inject } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { getAuth } from 'firebase-admin/auth';

import { UserEntity } from '../../domain/user.entity';
import { CreateUserCommand } from './create-user.command';
import { UserRepositoryPort } from '../../database/user.repository.port';
import { USER_REPOSITORY } from '../../user.di-tokens';
import { v4 } from 'uuid';

@CommandHandler(CreateUserCommand)
export class CreateUserService implements ICommandHandler {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepositoryPort
  ) {}

  async execute(command: CreateUserCommand): Promise<string> {
    const hashedPassword = await bcrypt.hash(command.password, 12);

    const id = v4();

    // Create Firebase User first and copy creation date to ensure consistency between records
    const result = await getAuth().createUser({
      uid: id,
      email: command.email,
      emailVerified: false,
      password: hashedPassword,
      displayName: command.handle,
      disabled: false
    });

    const createdAt = new Date(result.metadata.creationTime);

    try {
      const user = UserEntity.create(
        id,
        {
          email: command.email.toLocaleLowerCase(),
          handle: command.handle,
          password: hashedPassword
        },
        createdAt
      );

      await this.userRepo.createUser(user);

      return id;
    } catch (e: unknown) {
      getAuth().deleteUser(id);
      throw e;
    }
  }
}
