import { PageProps } from "fresh";
import { Post } from "@models";
import { Database } from "@database";
import { Head, Tag } from "@components";
import { getEstimatedReadingTime } from "@utils";
import { Markdown } from "../../utils/markdown.ts";
import { define } from "../../utils.ts";
import "../../assets/post.css";

type Props = {
  post: Post;
};

export const handler = define.handlers({
  async GET(ctx) {
    const post = await Database.posts.getBySlug(ctx.params.slug);
    if (!post) return ctx.redirect("/404");
    return {
      data: { post },
    };
  },
});

export default define.page<typeof handler>(
  function PostPage(props: PageProps<Props>) {
    const { post } = props.data;
    return (
      <>
        <Head
          title={post.title}
          meta={{
            keywords: post.tags,
            description: post.snippet,
            url: `https://gmaltez.dev/blog/${post.slug}`,
          }}
        >
        </Head>
        <article class="post-article">
          <header class="flex flex-col gap-4 mb-8">
            <h1 class="text-2xl sm:text-4xl font-bold leading-tight">
              {post.title}
            </h1>
            <div class="flex flex-row flex-wrap gap-2">
              {post.tags.map((tag) => <Tag key={tag} tag={tag} />)}
            </div>
            <hr class="border-text-tertiary/50" />
            <div class="flex flex-row items-center justify-start gap-3">
              <img
                height="50"
                width="50"
                class="rounded-full"
                alt="Picture of the author (Gustavo Maltez)"
                src="https://github.com/gustavomaltez.png?size=100"
                loading="lazy"
              />
              <div class="flex flex-col">
                <p class="text-base font-medium">Gustavo Maltez</p>
                <span class="flex flex-row items-center gap-2 text-sm text-text-tertiary">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                  <span class="rounded-full h-1 w-1 bg-text-tertiary" />
                  {getEstimatedReadingTime(post.content)} min read
                </span>
              </div>
            </div>
          </header>
          <div
            class="post-content"
            // deno-lint-ignore react-no-danger
            dangerouslySetInnerHTML={{ __html: Markdown.render(post.content) }}
          />
        </article>
      </>
    );
  },
);
