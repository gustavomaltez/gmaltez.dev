import { Handlers, PageProps } from '$fresh/server.ts';
import { CSS, render } from '$gfm';
import { getPost, Post } from '@utils/posts.ts';
import 'https://esm.sh/prismjs/components/prism-json?no-check';
import 'https://esm.sh/prismjs/components/prism-jsx?no-check';
import 'https://esm.sh/prismjs@1.29.0/components/prism-typescript?no-check';
import { Wrapper } from '../../components/Wrapper.tsx';

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
    <Wrapper
      title={post.title}
      head={
        <>
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
            `}
          </style>
        </>
      }
    >
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
    </Wrapper>
  );
}