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

  public get formattedElapsedTime() {
    const now = new Date();
    const elapsed = now.getTime() - this.createdAt.getTime();

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;
    const month = 30 * day;
    const year = 365 * day;

    if (elapsed < minute) {
      return 'just now';
    } else if (elapsed < hour) {
      const minutes = Math.floor(elapsed / minute);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (elapsed < day) {
      const hours = Math.floor(elapsed / hour);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (elapsed < week) {
      const days = Math.floor(elapsed / day);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (elapsed < month) {
      const weeks = Math.floor(elapsed / week);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (elapsed < year) {
      const months = Math.floor(elapsed / month);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(elapsed / year);
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
  }

  /**
   * This method is supposed to be used when the user data is sent from the server
   * side to the client side. When it happens, the user data is serialized into JSON,
   * so it will lose any data that is not a primitive type. In order to deserialize
   * it, we need to use this method to create a new instance of the Comment class.
   */
  static fromJSON(comment: Comment) {
    return new Comment({
      ...comment,
      author: User.fromJSON(comment.author),
      createdAt: new Date(comment.createdAt),
    });
  }
}
