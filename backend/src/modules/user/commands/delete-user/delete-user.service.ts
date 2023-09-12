import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { getAuth } from 'firebase-admin/auth';

import { USER_REPOSITORY } from '../../user.di-tokens';
import { UserRepositoryPort } from '../../database/user.repository.port';

export class DeleteUserCommand {
  readonly userId: string;

  constructor(props: DeleteUserCommand) {
    this.userId = props.userId;
  }
}

@CommandHandler(DeleteUserCommand)
export class DeleteUserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepositoryPort
  ) {}

  async execute(command: DeleteUserCommand): Promise<boolean> {
    const user = await this.userRepo.user({ id: command.userId });
    if (!user) throw new NotFoundException('User not found');
    
    try {
      user.delete();
      await this.userRepo.deleteUser(user);

      await getAuth().deleteUser(user.id);

      return true;
    } catch (e) {
      throw e;
    }
  }
}
