import { Comment } from '@models';

type MandatoryFields = {
  slug: string;
  title: string;
  publishedAt: Date;
  content: string;
  snippet: string;
};

const AVG_READING_WORDS_PER_MINUTE = 200;

export class Post {
  public slug: string;
  public title: string;
  public content: string;
  public snippet: string;
  public publishedAt: Date;
  public tags: string[] = [];
  public comments: Comment[] = [];

  constructor(data: MandatoryFields) {
    this.slug = data.slug;
    this.title = data.title;
    this.content = data.content;
    this.snippet = data.snippet;
    this.publishedAt = data.publishedAt;
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