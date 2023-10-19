import { User } from "@models";

export class Comment {
  public id: string | null = null;
  public author: User | null = null;
  public content: string | null = null;
  public parentId: string | null = null;
}