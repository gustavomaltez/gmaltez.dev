import { User } from "@models";

type MandatoryFields = {
  id: string;
  author: User;
  content: string;
  createdAt: Date;
}

export class Comment {
  public id: string;
  public author: User;
  public content: string;
  public createdAt: Date;
  public parentId: string | null = null;

  constructor(data: MandatoryFields) {
    this.id = data.id;
    this.author = data.author;
    this.content = data.content;
    this.createdAt = data.createdAt;
  }
}