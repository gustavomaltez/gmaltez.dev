import { Handlers, PageProps } from '$fresh/server.ts';

import { Post } from '@models';
import { db } from '@database';
import { Wrapper } from '@components';
import PostSearch from '@islands/PostSearch.tsx';

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await db.posts.getAll();
    return ctx.render(Post.sortByPublishDate(posts));
  },
};

export default function Posts(props: PageProps<Post[]>) {
  return (
    <Wrapper
      title='Posts'
      meta={{
        description:
          'Check out all the available posts on gmaltez.dev! Search by title, tag or content.',
        keywords: [
          'Gustavo Maltez',
          'GMaltez',
          'GMaltez.dev',
          'GMaltez.dev blog',
          'GMaltez.dev posts',
        ],
      }}
    >
      <section className='lg:w-screen max-w-screen-lg flex flex-col flex-1 gap-2'>
        <h1 className='text-xl mobile-high:text-2xl sm:text-3xl font-bold my-2'>
          Search by title, tag or content
        </h1>
        <PostSearch posts={props.data} />
      </section>
    </Wrapper>
  );
}
