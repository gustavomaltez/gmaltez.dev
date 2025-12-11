import { Head, PostPreview } from "@components";
import { define } from "../utils.ts";
import { Database } from "@database";

export const handler = define.handlers({
  async GET() {
    return {
      data: {
        posts: await Database.posts.getAll(),
      },
    };
  },
});

export default define.page<typeof handler>(
  function Home({ data }) {
    return (
      <>
        <Head />
        <section data-testid="hero-section" class="flex flex-col">
          <h1
            data-testid="hero-title"
            class="text-2xl sm:text-3xl font-bold my-2 text-text-primary"
          >
            Hello there!
          </h1>
          <p
            data-testid="hero-description"
            class="text-lg sm:text-xl text-text-secondary"
          >
            I'm Gustavo Maltez, a 24-year-old software developer from Brazil who
            is truly passionate about programming and modern web technologies.
            This is my personal website where I share my thoughts and
            experiences about software development.
          </p>
        </section>
        <h2
          data-testid="posts-heading"
          class="text-2xl sm:text-3xl font-bold text-text-primary"
        >
          Latest Posts
        </h2>
        <hr class="border-text-tertiary/50 my-1.5" />
        <section
          data-testid="posts-list"
          class="flex flex-col gap-5"
        >
          {data.posts.map((post) => (
            <PostPreview
              key={post.slug}
              post={post}
            />
          ))}
        </section>
      </>
    );
  },
);
