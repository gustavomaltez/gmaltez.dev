import { Comment } from '@models';

interface IPost {
  slug: string;
  title: string;
  tags?: string[];
  content: string;
  snippet: string;
  publishedAt: Date;
  comments?: Comment[];
};

const AVG_READING_WORDS_PER_MINUTE = 200;

export class Post implements IPost {
  public readonly slug: string;
  public readonly title: string;
  public readonly tags: string[];
  public readonly content: string;
  public readonly snippet: string;
  public readonly publishedAt: Date;
  public readonly comments: Comment[];

  constructor(data: IPost) {
    this.slug = data.slug;
    this.title = data.title;
    this.tags = data.tags ?? [];
    this.content = data.content;
    this.snippet = data.snippet;
    this.publishedAt = data.publishedAt;
    this.comments = data.comments ?? [];
  }

  public get estimatedReadingTime(): number {
    const numberOfWords = this.content.split(/\s/g).length;
    return Math.ceil(numberOfWords / AVG_READING_WORDS_PER_MINUTE);
  }

  public get formattedPublishDate(): string {
    return this.publishedAt.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }
  
  static sortByPublishDate(posts: Post[]): Post[] {
    return posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  }
}