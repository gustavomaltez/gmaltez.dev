import { Comment as CommentModel } from '@models';

export function Comment({ comment }: { comment: CommentModel }) {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-row gap-2'>
        <img
          alt='Profile picture'
          className='rounded-lg h-10 w-10'
          src={comment.author.githubImageURL}
        />
        <div className='flex flex-col gap-0.5'>
          <p className='text-text-primary font-bold text-sm'>{comment.author.name}</p>
          <span className='text-text-secondary text-xs'>{comment.formattedElapsedTime}</span>
        </div>
      </div>
      <p className='text-text-primary'>{comment.content}</p>
    </div>
  );
}
