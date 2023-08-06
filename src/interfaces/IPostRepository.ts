import { Post } from '@prisma/client';

export interface IPostRepository {
  create(title: string, content: string, userId: number): Promise<Post>;
  update(title: string, content: string, userId: number): Promise<Post>;
}