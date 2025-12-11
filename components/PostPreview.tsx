import { Tag } from "@components";
import { Post } from "@models";
import { getEstimatedReadingTime } from "@utils";

type Props = Readonly<{
  post: Post
}>

export function PostPreview({ post }: Props) {
  return (
    <a
      href={`/blog/${post.slug}`}
      class="group bg-background-secondary px-5 py-4 flex flex-col rounded-xl
        border border-[#2a2a2a] hover:border-primary/50
        transition-all duration-300 cursor-pointer"
    >
      <div class="flex flex-row justify-between mb-3 text-sm">
        <span class="text-text-tertiary flex flex-row items-center gap-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
            />
          </svg>
          {Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }).format(new Date(post.publishedAt))}
        </span>
        <span class="text-text-tertiary flex flex-row items-center gap-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {getEstimatedReadingTime(post.content)} min read
        </span>
      </div>
      <h2 class="text-xl sm:text-2xl font-bold text-text-primary mb-2
        group-hover:text-primary transition-colors duration-300">
        {post.title}
      </h2>
      <p class="text-text-secondary text-base sm:text-lg mb-3 line-clamp-3">
        {post.snippet}
      </p>
      <div class="flex flex-row flex-wrap gap-1 mt-auto">
        {post.tags.map((tag) => <Tag key={tag} tag={tag} />)}
      </div>
    </a>
  );
}
