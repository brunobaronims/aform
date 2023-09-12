import { Prisma, User } from '@prisma/client';

import { UserEntity } from '../domain/user.entity';

interface FindUsersParams {
  skip?: number;
  take?: number;
  cursor?: Prisma.UserWhereUniqueInput;
  where?: Prisma.UserWhereInput;
  orderBy?: Prisma.UserOrderByWithRelationInput;
}

export interface UserRepositoryPort {
  user(where: Prisma.UserWhereUniqueInput): Promise<UserEntity | null>;
  users(params: FindUsersParams): Promise<UserEntity[]>;
  createUser(entity: UserEntity): Promise<User | undefined>;
  updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
    entity: UserEntity;
  }): Promise<User>;
  deleteUser(entity: UserEntity): Promise<User>;
}
