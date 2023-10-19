import { Handlers, PageProps } from 'fresh/server.ts';

import { getAllPosts, Post } from '@utils/posts.ts';
import { Wrapper, PostPreview, Disclaimer } from '@components';

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await getAllPosts();
    return ctx.render(posts);
  },
};

export default function BlogIndexPage(props: PageProps<Post[]>) {
  const posts = props.data;
  return (
    <Wrapper title='Home'>
      <Disclaimer
        title='🚧 This blog is under development! 🚧'
        content='Thank you for accessing my blog in this early stage :) This project
        is still under development, so you may find some bugs here and there. The
        content is also still being written, so everything you see here is AI-generated
        text for testing purposes. Stay tuned for more updates!'
      />
      <WelcomeMessage />
      <h1 className='text-2xl sm:text-3xl font-bold my-1 text-text-primary'>
        Latest Posts
      </h1>
      <hr className='border-text-tertiary border-opacity-50' />
      <div className='flex flex-col gap-5'>
        {posts.map((post) => <PostPreview {...post} />)}
      </div>
    </Wrapper>
  );
}

function WelcomeMessage() {
  return (
    <div className='flex flex-col my-4'>
      <h1 className='text-2xl sm:text-3xl font-bold my-2 text-text-primary'>Hello there!</h1>
      <p class='text-lg sm:text-xl text-text-primary opacity-90'>
        I'm Gustavo Maltez, a 22-year-old software developer
        from Brazil who is truly passionate about programming and modern
        web technologies. This is my personal website where I share my thoughts
        and experiences about coding, software development and english.
      </p>
    </div>
  );
}