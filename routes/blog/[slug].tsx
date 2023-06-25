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
      </Head>
      <div className="bg-background text-text min-h-screen ">
        <Header />
        <main className="mx-auto max-w-screen-lg px-4 flex gap-6 flex-col">
          <div
            data-color-mode="dark"
            data-dark-theme="dark"
            class="mt-8 markdown-body "
            dangerouslySetInnerHTML={{ __html: render(post.content) }}
          />
        </main>
      </div>
    </>
  );
}