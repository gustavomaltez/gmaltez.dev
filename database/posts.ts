import { Post, PostSchema } from "@models";
import { extractTextMetadataAndContent } from "@utils";

export const posts = {
  getAll,
  getBySlug,
};

async function getAll(): Promise<Post[]> {
  const files = Deno.readDir("./posts");
  const promises: Promise<Post | null>[] = [];

  for await (const file of files) {
    promises.push(getBySlug(file.name.replace(".md", "")));
  }

  // Type assertion needed because filter(Boolean) doesn't narrow (Post | null)[] to Post[]
  const posts = (await Promise.all(promises)).filter(Boolean) as Post[];
  return posts.sort((a, b) => b.publishedAt - a.publishedAt);
}

async function getBySlug(slug: string): Promise<Post | null> {
  const { metadata, content } = extractTextMetadataAndContent(
    await Deno.readTextFile(`./posts/${slug}.md`),
  );

  try {
    const data = {
      slug,
      content,
      ...metadata,
      publishedAt: new Date(metadata.published_at).getTime(),
      tags: metadata.tags.split(",").map((x) => x.trim()),
    };
    return PostSchema.parse(data);
  } catch (error) {
    console.error(`Error parsing post with slug '${slug}'`, {
      metadata,
      error,
    });
    return null;
  }
}
