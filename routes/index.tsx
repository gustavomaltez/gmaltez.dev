import { Handlers, PageProps } from '$fresh/server.ts';
import { getPosts, Post } from '@utils/posts.ts';
import { Header } from '../components/index.ts';
import { Head } from '$fresh/runtime.ts';

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await getPosts();
    return ctx.render(posts);
  },
};

export default function BlogIndexPage(props: PageProps<Post[]>) {
  const posts = props.data;
  return (
    <>
      <Head>
        <title>GMaltez.dev</title>
      </Head>
      <div className="bg-background text-text min-h-screen">
        <Header />
        <main className="mx-auto max-w-screen-lg px-4 flex gap-6 flex-col">
          <h1 className="text-3xl font-bold mb-4">Latest Posts</h1>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div className="bg-secondary-button p-4 shadow">
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <p className="text-text">{post.snippet}</p>
                <a
                  href={`/blog/${post.slug}`}
                  className="text-primary-button hover:underline">
                  Read more
                </a>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}