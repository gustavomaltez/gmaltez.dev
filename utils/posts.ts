/**
 * Returns all available posts, sorted by published date (newest first).
 */
export async function getAllPosts(): Promise<Post[]> {
  const files = Deno.readDir('./posts');
  const promises = [];
  for await (const file of files)
    promises.push(getPostBySlug(file.name.replace('.md', '')));
  const posts = (await Promise.all(promises)).filter(Boolean) as Post[];
  posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  return posts;
}

/**
 * Returns all available posts, sorted by published date (newest first), but
 * without the post content.
 */
export async function getAllPostsWithoutContent(): Promise<PostWithoutContent[]> {
  const posts = await getAllPosts();
  return posts.map(({ content: _content, ...post }) => post);
}

/**
 * Returns the post with the given slug. If no post exists or the post has any
 * missing metadata, null is returned.
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const text = await Deno.readTextFile(`./posts/${slug}.md`);
    const { metadata, body } = getPostContentFromText(text);
    const { title, snippet } = metadata;
    const tags = metadata.tags ? metadata.tags.split(',').map(tag => tag.trim()) : [];
    const estimatedReadingTime = getTextReadingTime(body);
    const publishedAt = new Date(metadata.published_at);
    if (!title || !snippet || publishedAt.toString() === 'Invalid Date') return null;
    return { slug, title, publishedAt, content: body, snippet, tags, estimatedReadingTime };
  } catch (_error) {
    return null;
  }
}

/**
 * Extracts the metadata and body from a post text.
 * - The metadata is a YAML block at the top of the file.
 * - The body is the rest of the file.
 */
function getPostContentFromText(text: string): PostContent {
  const lines = text.split('\n');
  const metadata: Record<string, string> = {};
  let body = '';
  let inMetadata = false;
  for (const line of lines) {
    if (line === '---') {
      inMetadata = !inMetadata;
    } else if (inMetadata) {
      const [key, value] = line.split(': ');
      metadata[key] = value;
    } else {
      body += line + '\n';
    }
  }
  return { metadata, body };
}

const WORDS_PER_MINUTE = 200;

/**
 * Returns the estimated reading time for a post, in minutes.
 */
export function getTextReadingTime(text: string): number {
  const words = text.split(' ').length;
  return Math.ceil(words / WORDS_PER_MINUTE);
}

// Types -----------------------------------------------------------------------

type PostContent = {
  metadata: Record<string, string>;
  body: string;
};

export type PostComment = {
  id: string;
  date: string;
  author: string;
  content: string;
};

export type Post = {
  slug: string;
  title: string;
  publishedAt: Date;
  content: string;
  snippet: string;
  tags: string[];
  estimatedReadingTime: number;
};

export type PostWithoutContent = Omit<Post, 'content'>;

export type PostWithComments = Post & {
  comments: PostComment[];
}