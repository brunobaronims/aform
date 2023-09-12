import { Prisma, Post } from '@prisma/client';

import { PostEntity } from '../domain/post.entity';

interface FindPostsParams {
  skip?: number;
  take?: number;
  cursor?: Prisma.PostWhereUniqueInput;
  where?: Prisma.PostWhereInput;
  orderBy?: Prisma.PostOrderByWithRelationInput;
}

export interface PostRepositoryPort {
  post(where: Prisma.PostWhereUniqueInput): Promise<PostEntity | null>;
  posts(params: FindPostsParams): Promise<PostEntity[]>;
  createPost(entity: PostEntity): Promise<Post | undefined>;
  updatePost(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
    entity: PostEntity;
  }): Promise<Post>;
  deletePost(entity: PostEntity): Promise<Post>;
}
