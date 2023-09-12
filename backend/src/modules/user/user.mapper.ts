import { Mapper } from '@/libs/interfaces';
import { User } from '@prisma/client';
import joi from 'joi';

import { UserEntity } from './domain/user.entity';
import { Injectable } from '@nestjs/common';

export const userSchema = joi.object({
  id: joi.string().uuid().required(),
  password: joi.string().min(6).required(),
  email: joi.string().email().required(),
  handle: joi.string().required()
});

@Injectable()
export class UserMapper implements Mapper<UserEntity, User> {
  toPersistence(entity: UserEntity): User {
    const copy = entity.getAttributes();
    const record: User = {
      id: copy.id,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
      email: copy.email,
      password: copy.password,
      handle: copy.handle
    };

    return userSchema.validate(record).value;
  }

  toDomain(record: User): UserEntity {
    const entity = new UserEntity({
      id: record.id,
      createdAt: record.createdAt ?? undefined,
      updatedAt: record.updatedAt ?? undefined,
      additionalAttributes: {
        email: record.email,
        handle: record.handle,
        password: record.password
      }
    });

    return entity;
  }
}
