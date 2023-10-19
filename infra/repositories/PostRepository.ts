import { Post } from "@models";

export abstract class PostRepository {
  abstract getBySlug(slug: string): Promise<Post | null>;
}