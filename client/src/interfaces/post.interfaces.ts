export interface PostParams extends PostDescription {
  userId: string;
  handle: string;
}

export interface PostDescription {
  description: string;
}