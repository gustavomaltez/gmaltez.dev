/**
 * Returns all available posts, sorted by published date (newest first).
 */
export async function getAllPosts(): Promise<Post[]> {
  const files = Deno.readDir("./posts");
  const promises = [];
  for await (const file of files)
    promises.push(getPostBySlug(file.name.replace(".md", "")));
  const posts = (await Promise.all(promises)).filter(Boolean) as Post[];
  posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  return posts;
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
    const publishedAt = new Date(metadata.published_at);
    if (!title || !snippet || publishedAt.toString() === "Invalid Date") return null;
    return { slug, title, publishedAt, content: body, snippet };
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
  const lines = text.split("\n");
  const metadata: Record<string, string> = {};
  let body = "";
  let inMetadata = false;
  for (const line of lines) {
    if (line === "---") {
      inMetadata = !inMetadata;
    } else if (inMetadata) {
      const [key, value] = line.split(": ");
      metadata[key] = value;
    } else {
      body += line + "\n";
    }
  }
  return { metadata, body };
}
// Types -----------------------------------------------------------------------

type PostContent = {
  metadata: Record<string, string>;
  body: string;
};

export type Post = {
  slug: string;
  title: string;
  publishedAt: Date;
  content: string;
  snippet: string;
};