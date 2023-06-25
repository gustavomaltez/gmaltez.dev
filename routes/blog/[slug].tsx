import { Head } from '$fresh/runtime.ts';
import { Handlers, PageProps } from '$fresh/server.ts';
import { CSS, render } from '$gfm';
import { getPost, Post } from '@utils/posts.ts';
import 'https://esm.sh/prismjs/components/prism-json?no-check';
import 'https://esm.sh/prismjs/components/prism-jsx?no-check';
import 'https://esm.sh/prismjs@1.29.0/components/prism-typescript?no-check';
import { Header } from "../../components/index.ts";

export const handler: Handlers<Post> = {
  async GET(_req, ctx) {
    const post = await getPost(ctx.params.slug);
    if (post === null) return ctx.renderNotFound();
    return ctx.render(post);
  },
};

export default function PostPage(props: PageProps<Post>) {
  const post = props.data;
  return (
    <>
      <Head>
        <title>{post.title} - GMaltez.dev</title>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <style>
          {`
            .markdown-body h1,h2,h3,h4,h5,h6 {
              color: #fff;
            }

            .markdown-body p {
              color: #a3a3a3;
            }

            .markdown-body .highlight pre {
              background-color: #1b1a1f;
              border-radius: 0.5rem;
            }

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
        <main className="flex flex-col max-w-screen-lg mx-auto mt-5">
          <h1 className="text-3xl font-bold my-2">{post.title}</h1>
          <div
            data-color-mode="dark"
            data-dark-theme="dark"
            class="mt-8 markdown-body bg-background"
            dangerouslySetInnerHTML={{ __html: render(post.content) }}
            style={{
              backgroundColor: '#1e2022',
            }}
          />
        </main>
      </div>
    </>
  );
}