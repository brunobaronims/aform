import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { getAuth } from 'firebase-admin/auth';

import { UpdateUserCommand } from './update-user.command';
import { UserRepositoryPort } from '../../database/user.repository.port';
import { USER_REPOSITORY } from '../../user.di-tokens';

@CommandHandler(UpdateUserCommand)
export class UpdateUserService implements ICommandHandler {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepositoryPort
  ) {}

  async execute(command: UpdateUserCommand): Promise<string> {
    const user = await this.userRepo.user({ id: command.userId });
    if (!user) throw new NotFoundException('User not found');

    try {
      await this.userRepo.updateUser({
        where: {
          id: command.userId
        },
        entity: user,
        data: command.data
      });

      getAuth().updateUser(user.id, {
        email: command.data.email?.toString().toLocaleLowerCase(),
        displayName: command.data.handle?.toString()
      });

      return user.id;
    } catch (e) {
      throw e;
    }
  }
}
