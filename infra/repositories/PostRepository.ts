import { Post } from '@models';

export type PostQuery = {
  includeComments?: boolean;
};

export abstract class PostRepository {
  abstract getAll(query?: PostQuery): Promise<Post[]>;
  abstract getBySlug(slug: string, query?: PostQuery): Promise<Post | null>;
}
