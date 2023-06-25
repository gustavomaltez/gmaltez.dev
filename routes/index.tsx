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
        <meta name="author" content="Gustavo Maltez" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.svg" />
        <style>
          {`
            body {
              scroll-behavior: smooth;
            }
            
            * {
              scrollbar-width: auto;
              scrollbar-color: #333333 #1e2022;
            }
          
            /* Chrome, Edge, and Safari */
            *::-webkit-scrollbar {
              width: 16px;
            }
          
            *::-webkit-scrollbar-track {
              background: #1e2022;
            }
          
            *::-webkit-scrollbar-thumb {
              background-color: #333333;
              border-radius: 10px;
              border: 3px solid #1e2022;
            }
          `}
        </style>
      </Head>
      <div className="bg-background text-text min-h-screen px-4">
        <Header />
        <main className="mx-auto max-w-screen-lg px-4 flex gap-6 flex-col">
          {/* <div className="flex flex-col my-4">
            <h1 className="text-3xl font-bold my-2">Hello there!</h1>
            <p class="text-xl text-[#a3a3a3]">
              I'm Gustavo Maltez, a 21-year-old software developer
              from Brazil who is truly passionate about software development and modern
              web technologies. This is my personal website where I share my thoughts
              and experiences about software development, programming, English, and career.
            </p>
          </div> */}
          <div className="border-[#ff3b6b] bg-[#4b2f36] border p-4 shadow flex flex-col rounded-xl mb-1 mt-3">
            <h2 className="text-2xl font-bold text-[#ff3b6b] mb-2">🚧 This blog is under development! 🚧</h2>
            <p className="text-[#d997b1]">
              Thank you for accessing my blog! <span className="line-through opacity-75 italic">By the way, how did you get here?</span> {' '}
              Anyways, I am still working on it, so it is not ready yet. However, I hope to have it ready soon!
              The posts are just a bunch of dummy data, the design is not finished, and there are still some missing features and bugs to squash.
            </p>
          </div>
          <h1 className="text-3xl font-bold my-1">Latest Posts</h1>
          <hr className="border-[#a3a3a3] border-opacity-50" />
          <div className="flex flex-col gap-5">
            {posts.map((post) => (
              <div className="bg-[#1e2022] p-4 shadow flex flex-col rounded-xl">
                <div className="flex flex-row justify-between my-2">
                  <span className="text-gray-500">
                    {Intl.DateTimeFormat('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    }).format(new Date(post.publishedAt))}
                  </span>
                  <div className="flex flex-row gap-2">
                    {["Javascript", "React", "Example"].map((tag) => (
                      <a className="text-white rounded-md bg-blue-300 px-2 cursor-pointer">{tag}</a>
                    ))}
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{post.title}</h2>
                <p className="text-gray-300">{post.snippet}</p>
                <a
                  href={`/blog/${post.slug}`}
                  className="text-white hover:text-[#34a269] self-end"
                >
                  Read more
                </a>
              </div>
            ))}
          </div>
          <footer className="flex flex-col gap-2 mt-4">
            <hr className="border-[#a3a3a3] border-opacity-50" />

            <div className="flex flex-row m-4 justify-between">
              <p className="text-[#a3a3a3] text-sm">
                Made with ❤️ and ☕ by Gustavo Maltez. <br />
                © 2023 Gustavo Maltez. All rights reserved.
              </p>
              <a href="https://fresh.deno.dev" className="justify-self-end">
                <img
                  width="197"
                  height="37"
                  src="https://fresh.deno.dev/fresh-badge.svg"
                  alt="Made with Fresh"
                />
              </a>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}