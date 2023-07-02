import { Handlers, PageProps } from '$fresh/server.ts';
import { getAllPosts, Post } from '@utils/posts.ts';
import { Wrapper } from '../components/Wrapper.tsx';
import { PostPreview } from '../components/PostPreview.tsx';

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
      <UnderDevelopmentMessage />
      <WelcomeMessage />
      <h1 className="text-3xl font-bold my-1">Latest Posts</h1>
      <hr className="border-[#a3a3a3] border-opacity-50" />
      <div className="flex flex-col gap-5">
        {posts.map((post) => <PostPreview {...post} />)}
      </div>
    </Wrapper>
  );
}

function UnderDevelopmentMessage() {
  return (
    <div className="border-[#ff3b6b] bg-[#4b2f36] border p-4 shadow flex flex-col rounded-xl mb-1 mt-3">
      <h2 className="text-2xl font-bold text-[#ff3b6b] mb-2">🚧 This blog is under development! 🚧</h2>
      <p className="text-[#d997b1]">
        Thank you for accessing my blog! <span className="line-through opacity-75 italic">By the way, how did you get here?</span> {' '}
        Anyways, I am still working on it, so it is not ready yet. However, I hope to have it ready soon!
        The posts are just a bunch of dummy data, the design is not finished, and there are still some missing features and bugs to squash.
      </p>
    </div>
  );
}

function WelcomeMessage() {
  return (
    <div className="flex flex-col my-4">
      <h1 className="text-3xl font-bold my-2">Hello there!</h1>
      <p class="text-xl text-[#a3a3a3]">
        I'm Gustavo Maltez, a 22-year-old software developer
        from Brazil who is truly passionate about programming and modern
        web technologies. This is my personal website where I share my thoughts
        and experiences about coding, software development and english.
      </p>
    </div>
  );
}