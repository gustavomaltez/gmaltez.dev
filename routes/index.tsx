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
        <div class="flex flex-col">
          <h1 class="text-2xl sm:text-3xl font-bold my-2 text-text-primary">
            Hello there!
          </h1>
          <p class="text-lg sm:text-xl text-text-secondary">
            I'm Gustavo Maltez, a 24-year-old software developer from Brazil who
            is truly passionate about programming and modern web technologies.
            This is my personal website where I share my thoughts and
            experiences about software development.
          </p>
        </div>
        <h1 class="text-2xl sm:text-3xl font-bold text-text-primary">
          Latest Posts
        </h1>
        <hr class="border-text-tertiary/50 my-1.5" />
        <div class="flex flex-col gap-5">
          {data.posts.map((post) => <PostPreview key={post.slug} {...post} />)}
        </div>
      </>
    );
  },
);
