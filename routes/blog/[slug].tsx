import { Head } from '$fresh/runtime.ts';
import { Handlers, PageProps } from '$fresh/server.ts';
import { Post } from '@models';
import { Tag } from '@components';
import { Database } from '@database';
import { getEstimatedReadingTime } from '@utils';
import { Markdown } from '../../utils/markdown.ts';

type Props = {
  post: Post;
};

export const handler: Handlers<Props> = {
  async GET(_req, ctx) {
    const post = await Database.posts.getBySlug(ctx.params.slug);
    if (!post) return ctx.renderNotFound();
    return ctx.render({ post });
  },
};

export default function PostPage(props: PageProps<Props>) {
  const { post } = props.data;
  return (
    <>
      <Head>
        <title>GMALTEZ.DEV | {post.title}</title>
        <link
          rel='stylesheet'
          href='/post.css'
        />
      </Head>
      <h1 class='text-2xl sm:text-4xl font-bold'>{post.title}</h1>
      <div class='-my-3 flex flex-row flex-wrap'>
        {post.tags.map(tag => (
          <Tag tag={tag} />
        ))}
      </div>
      <hr class='border-text-tertiary border-opacity-50' />
      <div class='flex flex-row items-center justify-start gap-2 min-w-max'>
        <img
          height='50'
          width='50'
          class='rounded-full'
          alt='Picture of the author (Gustavo Maltez)'
          src='https://github.com/gustavomaltez.png'
        />
        <div class='flex flex-col'>
          <p class='text-1xl'>Gustavo Maltez</p>
          <span class='flex flex-row items-center justify-center gap-2 text-text-secondary'>
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
            <div class='rounded-full h-1 w-1 bg-text-secondary' />
            {getEstimatedReadingTime(post.content)} min read
          </span>
        </div>
      </div>
      <div
        class='post-content'
        dangerouslySetInnerHTML={{ __html: Markdown.render(post.content) }}
      />
    </>
  );
}
