import { Comment } from '@models';

export class Post {
  public slug: string | null = null;
  public comments: Comment[] = [];
}