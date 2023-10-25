import { User } from '@models';

interface IComment {
  id: string;
  author: User;
  content: string;
  createdAt: Date;
  parentId?: string | null;
}

export class Comment implements IComment {

  public readonly id: string;
  public readonly author: User;
  public readonly content: string;
  public readonly createdAt: Date;
  public readonly parentId: string | null;

  constructor(data: IComment) {
    this.id = data.id;
    this.author = data.author;
    this.content = data.content;
    this.createdAt = data.createdAt;
    this.parentId = data.parentId ?? null;
  }
}