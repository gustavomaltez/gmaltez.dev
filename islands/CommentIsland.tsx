import { JSX } from 'preact/jsx-runtime';
import { useRef, useState } from 'preact/hooks';

import { Comment } from '@models';
import { Comment as CommentEntry } from '@components';

// Types -----------------------------------------------------------------------

type Props = {
  comments: Comment[];
  isAuthenticated: boolean;
  onCommentSubmit: (content: string) => void;
  onReplySubmit: (content: string, commentId: string) => void;
};

// Wrapper ---------------------------------------------------------------------

export default function Wrapper(props: Props) {
  return (
    <CommentIsland
      {...props}
      comments={props.comments.map(Comment.fromJSON)}
    />
  );
}

// Component -------------------------------------------------------------------

function CommentIsland(props: Props) {
  const [comments] = useState<Comment[][]>(getSortedComments(props.comments));

  return (
    <div className='flex flex-col gap-4 max-w-xl'>
      <h2 className='font-bold text-xl'>Comments</h2>
      <CommentForm isAuthenticated />
      <div className='flex flex-col gap-4'>
        {comments.map(comments => (
          <CommentGroup comments={comments} />
        ))}
      </div>
    </div>
  );
}

// Sub-components --------------------------------------------------------------

function CommentGroup(props: { comments: Comment[] }) {
  const [showReplies, setShowReplies] = useState(false);

  if (props.comments.length === 1) return <CommentEntry comment={props.comments[0]} />;

  const [parent, ...replies] = props.comments;

  return (
    <div className='flex flex-col'>
      <CommentEntry comment={parent} />
      <div className='flex flex-row gap-2 text-xs text-text-secondary mt-1'>
        <RepliesButton
          count={replies.length}
          showReplies={showReplies}
          onClick={() => setShowReplies(!showReplies)}
        />
        <button className='hover:text-primary'>Reply</button>
      </div>
      <Replies
        comments={replies}
        isVisible={showReplies}
      />
    </div>
  );
}

function RepliesButton(props: { count: number; showReplies: boolean; onClick: () => void }) {
  if (props.count === 0) return <></>;
  return (
    <button
      onClick={props.onClick}
      className='hover:text-primary'
    >
      {getRepliesText(props.count, props.showReplies)}
    </button>
  );
}

function Replies(props: { comments: Comment[]; isVisible: boolean }) {
  if (!props.isVisible) return <></>;
  return (
    <div className='flex flex-col gap-2 ml-4 mt-2'>
      {props.comments.map(comment => (
        <CommentEntry comment={comment} />
      ))}
    </div>
  );
}

function CommentForm(props: { isAuthenticated: boolean }) {
  const avatarSeed = useRef(Math.random());
  const [content, setContent] = useState('');

  function onInput(event: JSX.TargetedEvent<HTMLDivElement, Event>) {
    const text = event.currentTarget.textContent ?? '';
    event.currentTarget.textContent = text;
    if (text.length <= 500) return setContent(text);
    event.currentTarget.textContent = content;
    moveCursorToEnd(event);
  }

  function moveCursorToEnd(event: JSX.TargetedEvent<HTMLDivElement, Event>) {
    const range = document.createRange();
    range.selectNodeContents(event.currentTarget);
    range.collapse(false);
    const selection = window.getSelection();
    if (!selection) return;
    selection.removeAllRanges();
    selection.addRange(range);
  }

  return (
    <form className='flex flex-col gap-2 items-end'>
      <div className='flex flex-row items-start w-full gap-3'>
        <img
          src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${avatarSeed.current}`}
          className='rounded-lg h-10 w-10'
        />
        <div
          contentEditable
          maxLength={500}
          onInput={onInput}
          className='bg-background-secondary rounded-md py-2 px-4 w-full 
          overflow-hidden break-words'
        />
      </div>
      <div className='flex flex-row gap-3 items-center justify-end w-full'>
        <span className='text-base text-text-secondary'>{content.length}/500</span>
        <button className='bg-primary text-white rounded-md p-2 max-w-[15rem] w-full'>
          Comment
        </button>
      </div>
    </form>
  );
}

// Helpers ---------------------------------------------------------------------

function getRepliesText(count: number, showReplies: boolean) {
  if (count === 1) return 'View 1 reply';
  if (showReplies) return `Hide ${count} replies`;
  return `View ${count} replies`;
}

function getSortedComments(input: Comment[]) {
  const comments: Record<string, Comment[]> = {};
  for (const comment of input) {
    const id = comment.parentId ?? comment.id;
    if (!comments[id]) comments[id] = [];
    comments[id].push(comment);
  }
  return Object.values(comments).map(sortByDate);
}

function sortByDate(comments: Comment[]) {
  return comments.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
}
