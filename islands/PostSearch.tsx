import { Post } from '@utils/posts.ts';
import { useState } from 'https://esm.sh/preact@10.13.1/hooks';

import { PostPreview, SearchBar } from '../components/index.ts';

export default function PostSearch(props: { posts: Post[]; }) {
  const [posts, setPosts] = useState(props.posts);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col md:flex-row w-full">
        <SearchBar
          onClear={() => setPosts(props.posts)}
          onInput={e => {
            const query = e.currentTarget.value.toLowerCase();
            if (query.length === 0) return setPosts(props.posts);
            setPosts(
              props.posts.filter(
                post =>
                  post.title.toLowerCase().includes(query) ||
                  post.content.toLowerCase().includes(query) ||
                  post.tags.some(tag => tag.toLowerCase().includes(query))
              )
            );
          }}
        />
        <button className="basis-1/5 mt-2 md:mt-0 md:ml-2 bg-primary text-white px-4 py-2 rounded-md min-w-max">
          Show Tags
        </button>
      </div>
      <div className="flex flex-col gap-5 mt-5">
        {posts.map(post => <PostPreview {...post} />)}
      </div>
    </div>
  );
}