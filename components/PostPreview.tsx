import { Post } from "../utils/posts.ts";
import { Tag } from "./Tag.tsx";

export function PostPreview(props: Post) {
  return (
    <div
      className="bg-background-secondary p-4 flex flex-col rounded-xl 
      ">
      <div className="flex flex-row justify-between mb-2">
        <PublishDate date={props.publishedAt} />
        <EstimatedReadingTime time={props.estimatedReadingTime} />
      </div>
      <a
        className="flex flex-row items-center text-xl font-bold text-text-primary mb-2 
        hover:text-primary gap-2 transition-all duration-200 cursor-pointer sm:text-2xl"
        href={`/blog/${props.slug}`}
      >
        {props.title}
      </a>
      <p className="text-text-primary opacity-90 text-base sm:text-lg">
        {props.snippet}
      </p>
      <div className="flex flex-row flex-wrap mt-2">
        {props.tags.map(tag => <Tag tag={tag} />)}
      </div>
    </div>
  );
}

function PublishDate(props: { date: Date; }) {
  return (
    <span className="text-text-tertiary flex flex-row items-center gap-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-5 h-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
        />
      </svg>
      {Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(new Date(props.date))}
    </span>
  );
}

function EstimatedReadingTime(props: { time: number; }) {
  return (
    <span className="text-text-tertiary flex flex-row items-center gap-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-5 h-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      {props.time} min read
    </span>
  );
}