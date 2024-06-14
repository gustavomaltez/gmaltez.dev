import { z } from 'zod';

const PostSchema = z.object({
  /** Short unique identifier for the post */
  slug: z.string().min(1, 'Slug is required'),
  /** Title of the post */
  title: z.string().min(1, 'Title is required'),
  /** Tags associated with the post */
  tags: z.array(z.string()),
  /** Full markdown content of the post */
  content: z.string().min(1, 'Content is required'),
  /** Short summary of the post */
  snippet: z.string().min(1, 'Snippet is required'),
  /** Date in milliseconds when the post was published */
  publishedAt: z.number().int().positive(),
});

type Post = z.infer<typeof PostSchema>;

export type { Post };
export { PostSchema };
