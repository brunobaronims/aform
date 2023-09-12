import { Mapper } from '@/libs/interfaces';
import { Post } from '@prisma/client';
import joi from 'joi';

import { PostEntity } from './domain/post.entity';
import { Injectable } from '@nestjs/common';

export const PostSchema = joi.object({
  id: joi.string().uuid().required(),
  password: joi.string().min(6).required(),
  email: joi.string().email().required(),
  handle: joi.string().required()
});

@Injectable()
export class PostMapper implements Mapper<PostEntity, Post> {
  toPersistence(entity: PostEntity): Post {
    const copy = entity.getAttributes();
    const record: Post = {
      id: copy.id,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
      userId: copy.userId,
      handle: copy.handle,
      description: copy.description
    };

    return PostSchema.validate(record).value;
  }

  toDomain(record: Post): PostEntity {
    const entity = new PostEntity({
      id: record.id,
      createdAt: record.createdAt ?? undefined,
      updatedAt: record.updatedAt ?? undefined,
      additionalAttributes: {
        description: record.description,
        handle: record.handle,
        userId: record.userId
      }
    });

    return entity;
  }
}
