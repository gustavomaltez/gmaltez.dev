import { Handlers, PageProps } from '$fresh/server.ts';
import { Head, PostPreview } from '@components';
import { Post } from '@models';
import { Database } from '@database';

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    return ctx.render(await Database.posts.getAll());
  },
};

export default function Home(props: PageProps<Post[]>) {
  const posts = props.data;
  return (
    <>
      <Head />
      <div class='flex flex-col'>
        <h1 class='text-2xl sm:text-3xl font-bold my-2 text-text-primary'>
          Hello there!
        </h1>
        <p class='text-lg sm:text-xl text-text-secondary'>
          I'm Gustavo Maltez, a 23-year-old software developer from Brazil who
          is truly passionate about programming and modern web technologies.
          This is my personal website where I share my thoughts and experiences
          about software development.
        </p>
      </div>
      <h1 class='text-2xl sm:text-3xl font-bold text-text-primary'>
        Latest Posts
      </h1>
      <hr class='border-text-tertiary border-opacity-50 my-1.5' />
      <div class='flex flex-col gap-5'>
        {posts.map(post => (
          <PostPreview {...post} />
        ))}
      </div>
    </>
  );
}
